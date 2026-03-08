"use client"

import { useState } from "react"
import { Building2, Clock, AlertTriangle, TrendingUp, Plus, Mail, Calendar, FileText, AlertCircle } from "lucide-react"

const statsCards = [
  {
    icon: Building2,
    iconBg: "bg-teal",
    iconColor: "text-navy",
    value: "8",
    label: "Truong active",
    sub: "Tong hop dong dang hieu luc",
  },
  {
    icon: Clock,
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-warning",
    value: "2",
    label: "Sap het HD",
    sub: "Trong 60 ngay toi",
    subColor: "text-warning",
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-[#FEE2E2]",
    iconColor: "text-red",
    value: "1",
    label: "At Risk",
    sub: "Engagement thap bat thuong",
    subColor: "text-red",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-[#D1FAE5]",
    iconColor: "text-success",
    value: "1",
    label: "Upsell",
    sub: "Vuot quota · Co hoi nang goi",
    subColor: "text-success",
  },
]

const schools = [
  {
    id: 1,
    name: "THPT Nguyen Du",
    city: "TP.HCM",
    status: "Healthy",
    statusIcon: "check",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    contract: "Truong Pro",
    expiry: "31/08/2026",
    daysLeft: 178,
    teachers: { active: 12, total: 15 },
    students: { active: 287, total: 300 },
    engagement: 8.4,
    avgEngagement: 6.2,
    engagementDiff: "+35%",
    engagementDiffColor: "text-success",
    flag: null,
    borderColor: "",
  },
  {
    id: 2,
    name: "THPT Le Quy Don",
    city: "Ha Noi",
    status: "At Risk",
    statusIcon: "alert",
    statusBg: "bg-[#FEE2E2]",
    statusColor: "text-[#991B1B]",
    contract: "Truong Basic",
    expiry: "15/04/2026",
    daysLeft: 40,
    teachers: { active: 4, total: 10 },
    students: { active: 89, total: 200 },
    engagement: 1.8,
    avgEngagement: 6.2,
    engagementDiff: "-71%",
    engagementDiffColor: "text-red",
    flag: { text: "Engagement giam 40% · Nguy co khong gia han", type: "critical" },
    borderColor: "border-l-4 border-red",
    expandable: true,
  },
  {
    id: 3,
    name: "THPT Tran Phu",
    city: "Da Nang",
    status: "Theo doi",
    statusIcon: "watch",
    statusBg: "bg-[#FEF3C7]",
    statusColor: "text-[#92400E]",
    contract: "Truong Pro",
    expiry: "30/06/2026",
    daysLeft: 116,
    teachers: { active: 9, total: 12 },
    students: { active: 201, total: 250 },
    engagement: 5.1,
    avgEngagement: 6.2,
    engagementDiff: "-18%",
    engagementDiffColor: "text-warning",
    flag: { text: "HD het han trong 116 ngay", type: "warning" },
    borderColor: "border-l-4 border-warning",
  },
  {
    id: 4,
    name: "THPT Chu Van An",
    city: "TP.HCM",
    status: "Upsell",
    statusIcon: "up",
    statusBg: "bg-[#EBF7F8]",
    statusColor: "text-blue",
    contract: "Truong Pro Plus",
    expiry: "31/12/2026",
    daysLeft: 300,
    teachers: { active: 18, total: 18 },
    students: { active: 412, total: 400 },
    engagement: 11.2,
    avgEngagement: 6.2,
    engagementDiff: "+81%",
    engagementDiffColor: "text-success",
    flag: { text: "Vuot quota HS · Can nang goi", type: "upsell" },
    borderColor: "border-l-4 border-teal",
  },
  {
    id: 5,
    name: "THPT Nguyen Hue",
    city: "Binh Duong",
    status: "Healthy",
    statusIcon: "check",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    contract: "Truong Basic",
    expiry: "30/09/2026",
    daysLeft: 208,
    teachers: { active: 6, total: 8 },
    students: { active: 142, total: 150 },
    engagement: 6.8,
    avgEngagement: 6.2,
    engagementDiff: "+10%",
    engagementDiffColor: "text-success",
    flag: null,
    borderColor: "",
  },
  {
    id: 6,
    name: "THPT Le Hong Phong",
    city: "TP.HCM",
    status: "Healthy",
    statusIcon: "check",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    contract: "Truong Pro",
    expiry: "15/10/2026",
    daysLeft: 223,
    teachers: { active: 14, total: 15 },
    students: { active: 324, total: 350 },
    engagement: 7.9,
    avgEngagement: 6.2,
    engagementDiff: "+27%",
    engagementDiffColor: "text-success",
    flag: null,
    borderColor: "",
  },
  {
    id: 7,
    name: "THPT Vo Thi Sau",
    city: "Can Tho",
    status: "Theo doi",
    statusIcon: "watch",
    statusBg: "bg-[#FEF3C7]",
    statusColor: "text-[#92400E]",
    contract: "Truong Basic",
    expiry: "28/05/2026",
    daysLeft: 83,
    teachers: { active: 5, total: 7 },
    students: { active: 98, total: 120 },
    engagement: 4.2,
    avgEngagement: 6.2,
    engagementDiff: "-32%",
    engagementDiffColor: "text-warning",
    flag: { text: "HD sap het han", type: "warning" },
    borderColor: "border-l-4 border-warning",
  },
  {
    id: 8,
    name: "THPT Quang Trung",
    city: "Hai Phong",
    status: "Healthy",
    statusIcon: "check",
    statusBg: "bg-[#D1FAE5]",
    statusColor: "text-[#065F46]",
    contract: "Truong Pro",
    expiry: "20/11/2026",
    daysLeft: 259,
    teachers: { active: 11, total: 12 },
    students: { active: 267, total: 280 },
    engagement: 7.3,
    avgEngagement: 6.2,
    engagementDiff: "+18%",
    engagementDiffColor: "text-success",
    flag: null,
    borderColor: "",
  },
]

export default function SchoolsPage() {
  const [expandedSchool, setExpandedSchool] = useState<number | null>(2)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Quan ly Truong & To chuc</h1>
          <p className="mt-1 text-sm text-muted-text">8 truong dang hop tac · 06/03/2026</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-fg-light hover:bg-navy-light transition-colors">
          <Plus className="h-4 w-4" />
          Them truong moi
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="rounded-[10px] border border-border-light bg-card-bg p-4 shadow-[0_1px_3px_rgba(29,53,87,0.10)]"
          >
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full ${card.iconBg}`}>
              <card.icon className={`h-5 w-5 ${card.iconColor}`} />
            </div>
            <p className="font-mono text-3xl font-bold text-navy">{card.value}</p>
            <p className="text-sm text-muted-text">{card.label}</p>
            <p className={`mt-1 text-xs ${card.subColor || 'text-muted-text'}`}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* School Cards Grid */}
      <div className="grid grid-cols-2 gap-5">
        {schools.map((school) => (
          <div key={school.id}>
            <div className={`rounded-[10px] border border-border-light bg-card-bg p-5 shadow-[0_1px_3px_rgba(29,53,87,0.10)] ${school.borderColor}`}>
              {/* Top Row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-navy">{school.name}</h3>
                  <span className="rounded-full bg-hover-row px-2 py-0.5 text-xs text-muted-text">
                    {school.city}
                  </span>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${school.statusBg} ${school.statusColor}`}>
                  {school.status} {school.statusIcon === 'check' ? '✓' : school.statusIcon === 'alert' ? '!' : school.statusIcon === 'up' ? '↑' : '•'}
                </span>
              </div>

              {/* Contract Row */}
              <p className="font-mono text-xs text-muted-text mb-4">
                {school.contract} · Het han {school.expiry} · con {school.daysLeft} ngay
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-3 mb-4 text-center">
                <div>
                  <p className="font-mono text-lg font-bold text-navy">{school.teachers.active}/{school.teachers.total}</p>
                  <p className="text-xs text-muted-text">GV kich hoat</p>
                </div>
                <div>
                  <p className="font-mono text-lg font-bold text-navy">{school.students.active}/{school.students.total}</p>
                  <p className="text-xs text-muted-text">HS onboard</p>
                </div>
                <div>
                  <p className="font-mono text-lg font-bold text-navy">{school.engagement}</p>
                  <p className="text-xs text-muted-text">phien/HS/tuan</p>
                </div>
                <div>
                  <p className={`font-mono text-lg font-bold ${school.engagementDiffColor}`}>{school.engagementDiff}</p>
                  <p className="text-xs text-muted-text">vs TB</p>
                </div>
              </div>

              {/* Engagement Bar */}
              <div className="mb-4">
                <p className="text-xs text-muted-text mb-1.5">Engagement so voi TB nen tang</p>
                <div className="relative h-2 w-full rounded-full bg-border-light overflow-hidden">
                  <div
                    className={`h-full rounded-full ${school.engagement < school.avgEngagement ? 'bg-red' : 'bg-teal'}`}
                    style={{ width: `${Math.min((school.engagement / 12) * 100, 100)}%` }}
                  />
                  {/* Average Marker */}
                  <div
                    className="absolute top-0 h-full w-0.5 bg-navy"
                    style={{ left: `${(school.avgEngagement / 12) * 100}%` }}
                  />
                </div>
              </div>

              {/* Flag Banner */}
              {school.flag && (
                <div className={`rounded-lg px-3 py-2 mb-4 ${
                  school.flag.type === 'critical' 
                    ? 'bg-[#FFF5F5] border-l-[3px] border-red' 
                    : school.flag.type === 'upsell'
                      ? 'bg-[#EBF7F8] border-l-[3px] border-teal'
                      : 'bg-[#FFFBEB] border-l-[3px] border-warning'
                }`}>
                  <p className={`text-xs ${
                    school.flag.type === 'critical' 
                      ? 'text-red' 
                      : school.flag.type === 'upsell'
                        ? 'text-blue'
                        : 'text-warning'
                  }`}>
                    {school.flag.text}
                  </p>
                </div>
              )}

              {/* Footer Row */}
              <div className="flex items-center justify-between pt-2 border-t border-border-light">
                <button 
                  onClick={() => school.expandable && setExpandedSchool(expandedSchool === school.id ? null : school.id)}
                  className="text-xs text-blue hover:underline"
                >
                  Xem chi tiet →
                </button>
                <button className="rounded-lg border border-blue px-2.5 py-1 text-xs font-medium text-blue hover:bg-blue/5">
                  Chuan bi meeting →
                </button>
              </div>
            </div>

            {/* Expanded Detail Panel */}
            {expandedSchool === school.id && school.expandable && (
              <div className="mt-1 rounded-[10px] border-t-2 border-red bg-card-bg p-6">
                <div className="grid grid-cols-[3fr_2fr] gap-8">
                  {/* Left - Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-semibold text-navy">THPT Le Quy Don — Ha Noi</h3>
                      <p className="mt-1 text-xs text-navy">Contract: Truong Basic · 5,000,000 VND/nam</p>
                      <p className="text-xs text-muted-text">Lien he: Pho hieu truong Nguyen Van Tam · 0912 xxx xxx</p>
                    </div>

                    {/* Engagement Trend Mini Chart */}
                    <div>
                      <p className="text-xs text-muted-text mb-2">Phien/HS/tuan qua 8 tuan</p>
                      <div className="flex items-end gap-1 h-12">
                        {[4.2, 3.9, 3.5, 3.2, 2.8, 2.4, 2.0, 1.8].map((val, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                            <div
                              className={`w-full rounded-t ${i >= 5 ? 'bg-red' : 'bg-teal'}`}
                              style={{ height: `${(val / 4.2) * 40}px` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risk Analysis Card */}
                    <div className="rounded-lg border border-red bg-[#FFF5F5] p-3">
                      <p className="flex items-center gap-2 text-sm font-medium text-red mb-2">
                        <AlertCircle className="h-4 w-4" />
                        Phan tich nguy co:
                      </p>
                      <ul className="space-y-1 text-xs text-red">
                        <li>• 6/10 GV chua kich hoat tai khoan</li>
                        <li>• Chi 89/200 HS da onboard sau 5 thang</li>
                        <li>• Khong co phien hoc nao trong 7 ngay qua</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right - Actions */}
                  <div className="space-y-3">
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-medium text-fg-light hover:bg-navy-light">
                      <Mail className="h-4 w-4" />
                      Gui email check-in
                    </button>
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue px-4 py-2.5 text-sm font-medium text-blue hover:bg-blue/5">
                      <Calendar className="h-4 w-4" />
                      Dat lich gap
                    </button>
                    <textarea
                      placeholder="Ghi chu account..."
                      className="w-full rounded-lg border border-border-light bg-page-bg px-3 py-2 text-xs placeholder:text-muted-text focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
                      rows={2}
                    />
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-red px-4 py-2 text-xs font-medium text-red hover:bg-red/5">
                      <FileText className="h-3 w-3" />
                      Bao cao nguy co len Admin
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
