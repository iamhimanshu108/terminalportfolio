import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { sound } from '../lib/sound';

interface DayContribution {
  id: string;
  date: string;
  count: number;
  level: number;
  text: string;
}

interface GitHubApiResponse {
  username: string;
  year: string;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  maxDaily: number;
  days: DayContribution[];
}

export const GitHubHeatmap: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<'2026' | '2025' | '2024'>('2026');
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<GitHubApiResponse | null>(null);
  const [hoveredDay, setHoveredDay] = useState<DayContribution | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchGithubData = async (year: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/github-contributions?username=iamhimanshu108&year=${year}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const json: GitHubApiResponse = await response.json();
      setData(json);
    } catch (err: any) {
      console.error("Failed to load GitHub contributions:", err);
      setError("Failed to fetch live data from GitHub API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData(selectedYear);
  }, [selectedYear]);

  // Generate 52-53 Week Columns from the rolling days list
  const getWeekColumns = (): DayContribution[][] => {
    if (!data || !data.days) return [];

    // Group into 7-day week columns (Sunday = 0)
    const weeks: DayContribution[][] = [];
    let currentWeek: DayContribution[] = [];

    const firstDateParts = data.days[0].date.split('-').map(Number);
    const firstDateUTC = new Date(Date.UTC(firstDateParts[0], firstDateParts[1] - 1, firstDateParts[2]));
    const leadingEmptyDays = firstDateUTC.getUTCDay(); // 0 = Sun, 6 = Sat

    for (let i = 0; i < leadingEmptyDays; i++) {
      currentWeek.push({
        id: `lead-${i}`,
        date: '',
        count: 0,
        level: 0,
        text: ''
      });
    }

    for (const day of data.days) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({
          id: `trail-${currentWeek.length}`,
          date: '',
          count: 0,
          level: 0,
          text: ''
        });
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const weeks = getWeekColumns();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Calculate exact week indexes where each month begins
  const getMonthLabelMap = (): { [weekIdx: number]: string } => {
    const labelMap: { [weekIdx: number]: string } = {};
    const seenMonths = new Set<string>();

    weeks.forEach((week, wIdx) => {
      for (const day of week) {
        if (day.date) {
          const parts = day.date.split('-');
          if (parts.length === 3) {
            const mIdx = parseInt(parts[1], 10) - 1;
            const dayNum = parseInt(parts[2], 10);
            const mName = monthNames[mIdx];

            if (dayNum <= 7 && !seenMonths.has(mName)) {
              seenMonths.add(mName);
              labelMap[wIdx] = mName;
              break;
            }
          }
        }
      }
    });

    return labelMap;
  };

  const monthLabelMap = getMonthLabelMap();

  const getLevelStyle = (level: number, hasDate: boolean): React.CSSProperties => {
    if (!hasDate) return { opacity: 0, pointerEvents: 'none' };
    switch (level) {
      case 1:
        return { backgroundColor: 'var(--heatmap-l1)', borderColor: 'var(--heatmap-l1)' };
      case 2:
        return { backgroundColor: 'var(--heatmap-l2)', borderColor: 'var(--heatmap-l2)' };
      case 3:
        return { backgroundColor: 'var(--heatmap-l3)', borderColor: 'var(--heatmap-l3)' };
      case 4:
        return {
          backgroundColor: 'var(--heatmap-l4)',
          borderColor: 'var(--heatmap-l4)',
          boxShadow: '0 0 8px var(--heatmap-l4-glow)'
        };
      default:
        return { backgroundColor: 'var(--heatmap-l0)', borderColor: 'var(--heatmap-l0)' };
    }
  };

  const dayLabels = [
    { label: 'Sun', show: true },
    { label: 'Mon', show: false },
    { label: 'Tue', show: true },
    { label: 'Wed', show: false },
    { label: 'Thu', show: true },
    { label: 'Fri', show: false },
    { label: 'Sat', show: true },
  ];

  return (
    <div className="bg-[#080C16] border border-slate-800/90 p-4 sm:p-5 rounded-xl space-y-4 shadow-xl font-mono text-xs">

      {/* Heatmap Header Metrics */}
      <div className="grid grid-cols-3 gap-3 pb-2 border-b border-slate-800/60 text-center sm:text-left">
        <div className="bg-[#03060E] border border-slate-800/80 p-2.5 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Total Commits</span>
          <span className="text-xs font-extrabold text-emerald-400">{data?.totalContributions || 0}</span>
        </div>
        <div className="bg-[#03060E] border border-slate-800/80 p-2.5 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Current Streak</span>
          <span className="text-xs font-extrabold text-cyan-400">{data?.currentStreak || 0} days</span>
        </div>
        <div className="bg-[#03060E] border border-slate-800/80 p-2.5 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Max Streak</span>
          <span className="text-xs font-extrabold text-amber-400">{data?.longestStreak || 0} days</span>
        </div>
      </div>

      {/* Main Heatmap Canvas */}
      <div className="bg-[#03060E] border border-slate-800/90 p-4 rounded-xl overflow-x-auto scrollbar-thin relative min-h-[170px] flex flex-col justify-between">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-3 text-slate-400 text-xs">
            <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin" />
            <span>FETCHING_LIVE_GITHUB_CONTRIBUTIONS [ @iamhimanshu108 ]...</span>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-rose-400 text-xs space-y-2">
            <p>[ERROR] {error}</p>
            <button
              onClick={() => fetchGithubData(selectedYear)}
              className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-200 rounded hover:bg-slate-700"
            >
              Retry Live Sync
            </button>
          </div>
        ) : (
          <>
            {/* Heatmap Grid Track */}
            <div className="min-w-[850px] pb-2">
              {/* Aligned Month Headers Row */}
              <div className="flex gap-1 pl-[32px] mb-2 select-none">
                {weeks.map((_, wIdx) => (
                  <div key={wIdx} className="w-3 text-[10px] text-slate-400 relative shrink-0 font-mono">
                    {monthLabelMap[wIdx] && (
                      <span className="absolute left-0 top-0 whitespace-nowrap font-bold text-emerald-400">
                        {monthLabelMap[wIdx]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Day Labels + Week Columns Grid */}
              <div className="flex items-start gap-1">
                {/* 7 Vertical Day Row Labels */}
                <div className="flex flex-col gap-1 text-[9px] text-slate-500 w-[28px] pr-1 select-none shrink-0 font-mono font-medium">
                  {dayLabels.map((d, i) => (
                    <div key={i} className="h-3 flex items-center justify-end">
                      {d.show ? d.label : ''}
                    </div>
                  ))}
                </div>

                {/* 52-53 Week Columns */}
                <div className="flex gap-1">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1 shrink-0">
                      {week.map((day, dIdx) => (
                        <div
                          key={dIdx}
                          onMouseEnter={() => day.date && setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                          style={getLevelStyle(day.level, !!day.date)}
                          className="w-3 h-3 rounded-[3px] border heatmap-cell cursor-pointer relative"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hover Tooltip & Color Legend Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-800/80 text-[10px] text-slate-400">
              <div className="min-h-[16px]">
                {hoveredDay && hoveredDay.date ? (
                  <span className="text-emerald-400 font-bold animate-pulse flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {hoveredDay.text || `${hoveredDay.count} contributions on ${hoveredDay.date}`}
                  </span>
                ) : (
                  <span className="text-slate-500">Hover over any commit square to view real daily contributions from GitHub.</span>
                )}
              </div>

              <div className="flex items-center space-x-1.5 self-end sm:self-auto font-mono text-[10px]">
                <span className="text-slate-500 font-semibold">Less</span>
                <div className="w-3 h-3 rounded-[3px] border" style={{ backgroundColor: 'var(--heatmap-l0)', borderColor: 'var(--heatmap-l0)' }} title="0 contributions" />
                <div className="w-3 h-3 rounded-[3px] border" style={{ backgroundColor: 'var(--heatmap-l1)', borderColor: 'var(--heatmap-l1)' }} title="1-3 contributions" />
                <div className="w-3 h-3 rounded-[3px] border" style={{ backgroundColor: 'var(--heatmap-l2)', borderColor: 'var(--heatmap-l2)' }} title="4-6 contributions" />
                <div className="w-3 h-3 rounded-[3px] border" style={{ backgroundColor: 'var(--heatmap-l3)', borderColor: 'var(--heatmap-l3)' }} title="7-9 contributions" />
                <div className="w-3 h-3 rounded-[3px] border" style={{ backgroundColor: 'var(--heatmap-l4)', borderColor: 'var(--heatmap-l4)', boxShadow: '0 0 6px var(--heatmap-l4-glow)' }} title="10+ contributions" />
                <span className="text-slate-500 font-semibold">More</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
