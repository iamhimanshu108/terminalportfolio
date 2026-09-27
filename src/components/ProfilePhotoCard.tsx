import React, { useRef } from 'react';

interface ProfilePhotoCardProps {
  src: string;
  alt: string;
  status?: string;
}

const particles = [
  ['12%', '15%', 'violet', '7s'], ['91%', '20%', 'cyan', '9s'], ['5%', '72%', 'cyan', '8s'],
  ['94%', '78%', 'violet', '10s'], ['18%', '94%', 'violet', '8.5s'], ['83%', '92%', 'cyan', '7.5s'],
];

export const ProfilePhotoCard: React.FC<ProfilePhotoCardProps> = ({ src, alt, status = 'ONLINE' }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--photo-tilt-x', `${(-y * 6).toFixed(2)}deg`);
    card.style.setProperty('--photo-tilt-y', `${(x * 6).toFixed(2)}deg`);
  };

  const resetTilt = () => {
    cardRef.current?.style.setProperty('--photo-tilt-x', '0deg');
    cardRef.current?.style.setProperty('--photo-tilt-y', '0deg');
  };

  return (
    <div
      ref={cardRef}
      className="profile-card-shell relative shrink-0 order-2 sm:order-2 [perspective:1000px]"
      onPointerMove={handleMove}
      onPointerLeave={resetTilt}
    >
      {particles.map(([top, left, color, duration], index) => (
        <span key={index} className={`profile-particle profile-particle-${color}`} style={{ top, left, animationDuration: duration }} />
      ))}
      <div className="profile-card-border absolute -inset-px rounded-xl" aria-hidden="true" />
      <div className="profile-card-photo relative z-10 w-[11.5rem] h-[14rem] sm:w-[18rem] sm:h-[20rem] overflow-hidden rounded-xl">
        <img src={src} alt={alt} className="h-full w-full object-cover rounded-xl" />
        <span className="profile-sweep" aria-hidden="true" />
      </div>
      <span className="absolute z-20 -bottom-1.5 -right-1.5 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/60 text-emerald-400 text-[9px] font-bold shadow-md flex items-center gap-1">
        <span className="profile-status-dot w-2 h-2 rounded-full bg-emerald-400" />
        {status}
      </span>
    </div>
  );
};
