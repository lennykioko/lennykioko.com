import {
  TbAppWindow,
  TbDeviceMobile,
  TbRobot,
  TbWorldWww,
} from "react-icons/tb";

const services = [
  {
    icon: TbWorldWww,
    title: "Websites",
    description: "Get found. Look credible. Convert.",
  },
  {
    icon: TbAppWindow,
    title: "Web Apps",
    description: "Dashboards and tools that retire the spreadsheets.",
  },
  {
    icon: TbDeviceMobile,
    title: "Mobile Apps",
    description: "Android and iOS, in your customer's pocket.",
  },
  {
    icon: TbRobot,
    title: "Automation",
    description: "The busywork runs itself.",
  },
];

export default function Services() {
  return (
    <section className="w-full border-b-2 border-amber-400 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <p className="text-center text-base text-gray-600 sm:text-lg">
          Every build has to pay for itself &mdash; in{" "}
          <strong className="font-semibold text-black">hours saved</strong> or{" "}
          <strong className="font-semibold text-black">revenue earned</strong>.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          {services.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-amber-400 bg-white text-amber-500">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold leading-tight">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
