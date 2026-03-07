import { User, Bell, Shield, Palette } from "lucide-react"

const settingsSections = [
  {
    icon: User,
    title: "Thông tin cá nhân",
    description: "Cập nhật tên, email và ảnh đại diện",
  },
  {
    icon: Bell,
    title: "Thông báo",
    description: "Quản lý cài đặt thông báo và nhắc nhở",
  },
  {
    icon: Shield,
    title: "Bảo mật",
    description: "Đổi mật khẩu và cài đặt bảo mật",
  },
  {
    icon: Palette,
    title: "Giao diện",
    description: "Tùy chỉnh giao diện và hiển thị",
  },
]

export default function CaiDatPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-navy">Cài đặt</h1>

      <div className="grid gap-4">
        {settingsSections.map((section) => {
          const Icon = section.icon
          return (
            <div
              key={section.title}
              className="flex items-center gap-4 rounded-[10px] border border-border-color bg-card-bg p-5 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal">
                <Icon className="h-6 w-6 text-navy" />
              </div>
              <div>
                <h3 className="font-semibold text-navy">{section.title}</h3>
                <p className="text-sm text-muted-text">{section.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
