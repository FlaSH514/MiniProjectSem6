"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FileQuestionIcon,
  TrendingUp,
  NewspaperIcon,
  BookOpen,
  Users2,
  Headphones,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase.config";
const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const routes = [
  {
    label: "Personalized Test",
    icon: FileQuestionIcon,
    desc: "Take adaptive tests tailored to your learning pace and needs.",
    color: "text-violet-500",
    bgColor: "text-violet-500/10",
    href: "/initialTest",
  },
  {
    label: "Performance Insights",
    icon: NewspaperIcon,
    desc: "Get detailed insights into your test performance and areas for improvement.",
    color: "text-orange-700",
    bgColor: "text-orange-700/10",
    href: "/initialTest",
  },
  {
    label: "Progress Tracking",
    icon: TrendingUp,
    desc: "Track your progress over time and set goals for improvement.",
    color: "text-green-700",
    bgColor: "text-green-700/10",
    href: "/initialTest",
  },
  // {
  //   label: "Study Materials",
  //   icon: BookOpen,
  //   desc: "Access a library of study materials and resources to enhance your learning.",
  //   color: "text-blue-700",
  //   bgColor: "text-blue-700/10",
  //   href: "/initialTest",
  // },
  {
    label: "Community Forums",
    icon: Users2,
    desc: "Engage with peers and experts in community forums for collaborative learning.",
    color: "text-indigo-700",
    bgColor: "text-indigo-700/10",
    href: "/community",
  },
  {
    label: "Customer Support",
    icon: Headphones,
    desc: "Instant tech support via chatbot, ensuring a smooth learning experience.",
    color: "text-green-700",
    bgColor: "text-purple-700/10",
    href: "/dashboard",
  },
];
const Sidebar = () => {
  const [initialTestGiven, setInitialTestGiven] = useState(false);
  useEffect(() => {
    const checkInitialTestGiven = async () => {
      if (user) {
        const userRef = doc(db, "users", user.id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.initialTest) {
            setInitialTestGiven(true);
            console.log("initial test is given");
          } else {
            setInitialTestGiven(false);
            console.log("Initial test not given");
          }
        }
      }
    };
    checkInitialTestGiven();
  });

  const pathname = usePathname();
  const { user } = useUser();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1 overflow-y-auto">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            AceUP
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={
                route.href === "/community"
                  ? "/community"
                  : initialTestGiven
                  ? "/mainTest"
                  : "/initialTest"
              }
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full cursor-pointer justify-start font-medium hover:text-white hover:bg-white/10 rounded-lg transition"
                // pathname === route.href
                //   ? "text-white bg-white/10"
                //   : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon
                  className={cn("h-5 w-6 mr-3 text-white", route.color)}
                />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-4">
        <div className="mt-auto px-2 my-2 py-2 flex gap-2 items-center  font-medium text-white/70 hover:bg-white/10 rounded-lg transition hover:text-white">
          <UserButton />
          <h1 className="text-sm">{user?.fullName}</h1>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
