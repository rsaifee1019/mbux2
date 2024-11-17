import Link from 'next/link'

export default function QuickLinks() {
    const links = [
      { title: 'অনলাইন টিউশন ফি', href: '/fees', icon: '💰' },
      { title: 'শিক্ষকমণ্ডলী', href: '/faculty', icon: '👥' },
      { title: 'হাজিরা', href: '/absent', icon: '📊' },
      { title: 'ভর্তি', href: '/admissions', icon: '📝' },
    ]
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <span className="text-3xl mb-2 block">{link.icon}</span>
              <h3 className="font-semibold">{link.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    )
  }