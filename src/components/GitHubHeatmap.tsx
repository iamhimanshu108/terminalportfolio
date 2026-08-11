import React, { useState, useEffect } from 'react';
import { GitCommit, Flame, ExternalLink, Trophy, Star, RefreshCw, CheckCircle2 } from 'lucide-react';
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

  // Generate 52-53 Week Columns for the full year
  const getWeekColumns = (): DayContribution[][] => {
    if (!data || !data.days) return [];

    const yearNum = parseInt(selectedYear, 10);
    const isLeap = (yearNum % 4 === 0 && yearNum % 100 !== 0) || (yearNum % 400 === 0);
    const totalYearDays = isLeap ? 366 : 365;

    // Day lookup map
    const dayByDate = new Map<string, DayContribution>();
    for (const d of data.days) {
      if (d.date) {
        dayByDate.set(d.date, d);
      }
    }

    // Full year list
    const fullYearList: DayContribution[] = [];
    const yearStart = new Date(Date.UTC(yearNum, 0, 1));

    for (let i = 0; i < totalYearDays; i++) {
      const cur = new Date(yearStart);
      cur.setUTCDate(yearStart.getUTCDate() + i);
      const dateStr = cur.toISOString().split('T')[0];

      if (dayByDate.has(dateStr)) {
        fullYearList.push(dayByDate.get(dateStr)!);
      } else {
        fullYearList.push({
          id: `pad-${dateStr}`,
          date: dateStr,
          count: 0,
          level: 0,
          text: `0 contributions on ${dateStr}`
        });
      }
    }

    // Group into 7-day week columns (Sunday = 0)
    const weeks: DayContribution[][] = [];
    let currentWeek: DayContribution[] = [];

    const firstDateParts = fullYearList[0].date.split('-').map(Number);
    const firstDateUTC = new Date(Date.UTC(firstDateParts[0], firstDateParts[1] - 1, firstDateParts[2]));
    const leadingEmptyDays = firstDateUTC.getUTCDay(); // 0 = Sun, 6 = Sat

    for (let i = 0; i < leadingEmptyDays; i++) {
      currentWeek.push({
        id: `lead-${i}`,
        date: '',
        count: 0,
        level: 0,
        text: 'No data'
      });
    }

    for (const day of fullYearList) {
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
          text: 'No data'
        });
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const weeks = getWeekColumns();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Calculate month label alignment based on week index
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

  const getLevelBg = (level: number, hasDate: boolean) => {
    if (!hasDate) return 'opacity-0';
    switch (level) {
      case 1:
        return 'bg-[#0e4429] border-[#0e4429] hover:border-emerald-400';
      case 2:
        return 'bg-[#006d32] border-[#006d32] hover:border-emerald-300';
      case 3:
        return 'bg-[#26a641] border-[#26a641] hover:border-emerald-200';
      case 4:
        return 'bg-[#39d353] border-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.8)]';
      default:
        return 'bg-[#161b22] border-[#161b22] hover:border-slate-600';
    }
  };

  return (
    <div className="bg-[#0A0E17] border border-slate-800/90 p-5 rounded-lg space-y-4 shadow-xl font-mono text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
            <GitCommit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-slate-200 text-sm">GITHUB_CONTRIBUTION_HEATMAP</h3>
              <span className="text-[10px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                @iamhimanshu108
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              <strong className="text-emerald-400 font-bold">
                {data ? data.totalContributions : '...'}
              </strong> total contributions in {selectedYear} fetched live from GitHub
            </p>
          </div>
        </div>

        {/* Year Selector & Controls */}
        <div className="flex items-center space-x-2">
          {(['2026', '2025', '2024'] as const).map((year) => (
            <button
              key={year}
              onClick={() => {
                sound.playKeypress();
                setSelectedYear(year);
              }}
              className={`px-2.5 py-1 text-xs font-bold rounded border transition-colors ${
                selectedYear === year
                  ? 'bg-emerald-500 text-black border-emerald-400'
                  : 'bg-[#050810] text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {year}
            </button>
          ))}

          <button
            onClick={() => {
              sound.playKeypress();
              fetchGithubData(selectedYear);
            }}
            disabled={loading}
            className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-400 hover:text-emerald-400 transition-colors disabled:opacity-50"
            title="Refresh Live GitHub Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>

          <a
            href="https://github.com/iamhimanshu108"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playKeypress()}
            className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-slate-700 transition-colors"
            title="View Official GitHub Profile"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Metrics Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
        <div className="bg-[#050810] border border-slate-800/80 p-2.5 rounded flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <GitCommit className="w-3.5 h-3.5 text-emerald-400" />
            Year Contributions
          </span>
          <span className="font-bold text-emerald-400">
            {loading ? '...' : data?.totalContributions}
          </span>
        </div>

        <div className="bg-[#050810] border border-slate-800/80 p-2.5 rounded flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Max Single Day
          </span>
          <span className="font-bold text-amber-400">
            {loading ? '...' : `${data?.maxDaily || 0} Commits`}
          </span>
        </div>

        <div className="bg-[#050810] border border-slate-800/80 p-2.5 rounded flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-cyan-400" />
            Longest Streak
          </span>
          <span className="font-bold text-cyan-400">
            {loading ? '...' : `${data?.longestStreak || 0} Days`}
          </span>
        </div>

        <div className="bg-[#050810] border border-slate-800/80 p-2.5 rounded flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-purple-400" />
            Data Source
          </span>
          <span className="font-bold text-purple-400">
            GitHub Live API
          </span>
        </div>
      </div>

      {/* Heatmap Grid Section */}
      <div className="bg-[#03060E] border border-slate-800/90 p-4 rounded-lg overflow-x-auto scrollbar-thin relative min-h-[170px] flex flex-col justify-between">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-3 text-slate-400 text-xs">
            <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin" />
            <span>CONNECTING_TO_GITHUB_API [ @iamhimanshu108 ]...</span>
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
            {/* Heatmap Outer Canvas */}
            <div className="min-w-[780px] pb-2">
              {/* Aligned Month Labels Row */}
              <div className="flex gap-1 pl-[28px] mb-1.5 select-none">
                {weeks.map((_, wIdx) => (
                  <div key={wIdx} className="w-2.5 h-3 text-[10px] text-slate-500 relative shrink-0">
                    {monthLabelMap[wIdx] && (
                      <span className="absolute left-0 top-0 whitespace-nowrap font-bold text-slate-400">
                        {monthLabelMap[wIdx]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Day Labels + Week Columns Grid */}
              <div className="flex items-start gap-1">
                {/* Vertical Day Labels */}
                <div className="flex flex-col justify-between text-[9px] text-slate-500 h-[106px] w-[24px] pr-1 py-0.5 select-none shrink-0 font-sans font-medium">
                  <span>Sun</span>
                  <span>Tue</span>
                  <span>Thu</span>
                  <span>Sat</span>
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
                          className={`w-2.5 h-2.5 rounded-[2px] border transition-all duration-150 ${getLevelBg(
                            day.level,
                            !!day.date
                          )}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hover Tooltip & Legend Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2 pt-3 border-t border-slate-800/80 text-[10px] text-slate-400">
              <div className="min-h-[16px]">
                {hoveredDay ? (
                  <span className="text-emerald-400 font-bold animate-pulse">
                    &gt; {hoveredDay.text || `${hoveredDay.count} contributions on ${hoveredDay.date}`}
                  </span>
                ) : (
                  <span className="text-slate-500">Hover over any square to view real daily commits from GitHub.</span>
                )}
              </div>

              <div className="flex items-center space-x-1.5 self-end sm:self-auto font-sans text-[10px]">
                <span className="text-slate-500">Less</span>
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#161b22] border border-[#161b22]" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429] border border-[#0e4429]" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32] border border-[#006d32]" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641] border border-[#26a641]" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353] border border-[#39d353]" />
                <span className="text-slate-500">More</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
