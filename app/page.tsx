"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Ticket } from 'lucide-react';

export default function Home() {
  const router = useRouter()

  const onClick =()=>{
    router.push("/auth/login")
  }
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0);

  // Navigation items
  const navItems = [
    { name: 'HOME', href: '#', active: true },
    { name: 'TIM', href: '#' },
    { name: 'TRANSFER', href: '#' },
    { name: 'JADWAL', href: '#' },
    { name: 'TIKET', href: '#' },
    { name: 'KARIR', href: '#' },
    { name: 'STATISTIK', href: '#' },
    { name: 'BERITA', href: '#' },
    { name: 'THE AWARDS', href: '#' },
    { name: 'MPL JOURNEY', href: '#' }
  ];

  // Schedule data
  const schedules = [
    {
      team1: { name: 'ONIC', logo: '/api/placeholder/40/40' },
      team2: { name: 'Team Liquid ID', logo: '/api/placeholder/40/40' },
      date: '11 Jun / 13:00'
    },
    {
      team1: { name: 'Bigetron Esports', logo: '/api/placeholder/40/40' },
      team2: { name: 'Alter Ego Esports', logo: '/api/placeholder/40/40' },
      date: '11 Jun / 18:15'
    },
    {
      team1: { name: 'Geek Fam', logo: '/api/placeholder/40/40' },
      team2: { name: 'TBD', logo: '/api/placeholder/40/40' },
      date: '12 Jun / 13:00'
    },
    {
      team1: { name: 'RRQ', logo: '/api/placeholder/40/40' },
      team2: { name: 'TBD', logo: '/api/placeholder/40/40' },
      date: '12 Jun / 18:15'
    },
    {
      team1: { name: 'TBD', logo: '/api/placeholder/40/40' },
      team2: { name: 'TBD', logo: '/api/placeholder/40/40' },
      date: '13 Jun / 13:00'
    },
    {
      team1: { name: 'TBD', logo: '/api/placeholder/40/40' },
      team2: { name: 'TBD', logo: '/api/placeholder/40/40' },
      date: '13 Jun / 18:15'
    },
    {
      team1: { name: 'TBD', logo: '/api/placeholder/40/40' },
      team2: { name: 'TBD', logo: '/api/placeholder/40/40' },
      date: '14 Jun / 17:30'
    },
    {
      team1: { name: 'TBD', logo: '/api/placeholder/40/40' },
      team2: { name: 'TBD', logo: '/api/placeholder/40/40' },
      date: '15 Jun / 17:30'
    }
  ];

  // Standings data
  const standings = [
    {
      rank: 1,
      team: 'RRQ HOSHI',
      logo: '/api/placeholder/24/24',
      matchPoint: 12,
      matchRecord: '12 - 4',
      netGameWin: 11,
      gameRecord: '25 - 14'
    },
    {
      rank: 2,
      team: 'GEEK FAM',
      logo: '/api/placeholder/24/24',
      matchPoint: 11,
      matchRecord: '11 - 5',
      netGameWin: 8,
      gameRecord: '25 - 17'
    },
    {
      rank: 3,
      team: 'ONIC',
      logo: '/api/placeholder/24/24',
      matchPoint: 10,
      matchRecord: '10 - 6',
      netGameWin: 7,
      gameRecord: '24 - 17'
    },
    {
      rank: 4,
      team: 'BIGETRON ESPORTS',
      logo: '/api/placeholder/24/24',
      matchPoint: 9,
      matchRecord: '9 - 7',
      netGameWin: 5,
      gameRecord: '23 - 18'
    },
    {
      rank: 5,
      team: 'ALTER EGO ESPORTS',
      logo: '/api/placeholder/24/24',
      matchPoint: 9,
      matchRecord: '9 - 7',
      netGameWin: 4,
      gameRecord: '22 - 18'
    },
    {
      rank: 6,
      team: 'TEAM LIQUID ID',
      logo: '/api/placeholder/24/24',
      matchPoint: 9,
      matchRecord: '9 - 7',
      netGameWin: 2,
      gameRecord: '22 - 20'
    },
    {
      rank: 7,
      team: 'EVOS',
      logo: '/api/placeholder/24/24',
      matchPoint: 7,
      matchRecord: '7 - 9',
      netGameWin: -2,
      gameRecord: '19 - 21',
      eliminated: true
    },
    {
      rank: 8,
      team: 'DEWA UNITED ESPORTS',
      logo: '/api/placeholder/24/24',
      matchPoint: 5,
      matchRecord: '5 - 11',
      netGameWin: -9,
      gameRecord: '15 - 24',
      eliminated: true
    },
    {
      rank: 9,
      team: 'NAVI',
      logo: '/api/placeholder/24/24',
      matchPoint: 0,
      matchRecord: '0 - 16',
      netGameWin: -26,
      gameRecord: '6 - 32',
      eliminated: true
    }
  ];

  const scrollSchedule = (direction: string) => {
    const maxIndex = Math.max(0, schedules.length - 4);
    if (direction === 'left') {
      setCurrentScheduleIndex(Math.max(0, currentScheduleIndex - 1));
    } else {
      setCurrentScheduleIndex(Math.min(maxIndex, currentScheduleIndex + 1));
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Roboto_Condensed',sans-serif]">
      {/* Top Navbar */}
      <nav className="bg-red-900 flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 py-3">
        <div className="flex items-center space-x-4">
          <img 
            src="/api/placeholder/40/40" 
            alt="MPL Indonesia logo" 
            className="h-10 w-auto"
          />
          <span className="text-white font-['Oswald',sans-serif] text-2xl md:text-3xl tracking-widest leading-none">
            MPL INDONESIA
          </span>
        </div>
        
        <ul className="hidden md:flex items-center space-x-5 text-white font-semibold text-sm tracking-wide">
          {navItems.map((item, index) => (
            <li key={index}>
              <a 
                href={item.href}
                className={`hover:text-red-400 transition-colors ${
                  item.active ? 'text-red-400' : ''
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
          </li>
          <li>
            <a onClick={onClick} href="#" className="hover:text-red-400 font-bold">
              LOGIN
            </a>
          </li>
        </ul>
      </nav>

      {/* Schedule Carousel */}
      <section className="relative bg-white py-4 overflow-hidden">
        <div 
          className="flex space-x-6 px-4 sm:px-6 md:px-10 lg:px-20 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentScheduleIndex * 200}px)` }}
        >
          {schedules.map((match, index) => (
            <div key={index} className="flex-shrink-0 flex flex-col items-center border-4 border-red-900 p-4 min-w-[180px]">
              <div className="flex items-center space-x-2">
                <img 
                  src={match.team1.logo} 
                  alt={`${match.team1.name} logo`} 
                  className="h-10 w-10"
                />
                <span className="font-bold text-sm">VS</span>
                <img 
                  src={match.team2.logo} 
                  alt={`${match.team2.name} logo`} 
                  className="h-10 w-10"
                />
              </div>
              <div className="text-xs mt-1 text-center">
                {match.date}
              </div>
              <button className="mt-1 bg-red-900 text-yellow-400 font-bold px-3 py-1 flex items-center space-x-1 text-xs">
                <Ticket size={12} />
                <span>BELI TIKET</span>
              </button>
            </div>
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button
          onClick={() => scrollSchedule('left')}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-red-900 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-800 transition-colors"
          disabled={currentScheduleIndex === 0}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => scrollSchedule('right')}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-red-900 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-800 transition-colors"
          disabled={currentScheduleIndex >= schedules.length - 4}
        >
          <ChevronRight size={16} />
        </button>
      </section>

      {/* Background pattern */}
      <div className="relative">
        <div className="absolute inset-x-0 top-20 w-full h-96 bg-gradient-to-r from-red-50 to-red-100 opacity-30 pointer-events-none"></div>
        
        {/* Standings Title */}
        <h2 className="text-center text-4xl md:text-5xl font-['Oswald',sans-serif] text-gray-600 mt-20 mb-6 tracking-wide">
          PERINGKAT
        </h2>

        {/* Standings Table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg">
              <thead>
                <tr className="bg-black text-white text-sm font-bold">
                  <th className="text-left py-3 px-3">TEAM</th>
                  <th className="text-center text-red-400 px-3">MATCH POINT</th>
                  <th className="text-center px-3">MATCH W-L</th>
                  <th className="text-center text-red-400 px-3">NET GAME WIN</th>
                  <th className="text-center px-3">GAME W-L</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800 font-semibold">
                {standings.map((team, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-gray-200 ${
                      team.eliminated ? 'bg-red-100' : ''
                    }`}
                  >
                    <td className="flex items-center space-x-2 py-3 px-3">
                      <div className="bg-black text-white font-['Oswald',sans-serif] text-xl w-8 h-10 flex items-center justify-center">
                        {team.rank}
                      </div>
                      <img 
                        src={team.logo} 
                        alt={`${team.team} logo`} 
                        className="h-6 w-6"
                      />
                      <span>{team.team}</span>
                    </td>
                    <td className="text-center text-red-600 font-bold px-3">
                      {team.matchPoint}
                    </td>
                    <td className="text-center px-3">
                      {team.matchRecord}
                    </td>
                    <td className="text-center text-red-600 font-bold px-3">
                      {team.netGameWin > 0 ? '+' : ''}{team.netGameWin}
                    </td>
                    <td className="text-center px-3">
                      {team.gameRecord}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs font-semibold text-gray-600">
            *Tiga posisi terbawah tidak lolos ke babak playoffs
          </p>
        </div>
      </div>
    </div>
  );
};