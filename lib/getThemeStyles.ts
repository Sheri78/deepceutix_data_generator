export type ThemeStyles = {
  background: string;
  orb1: string;
  orb2: string;
  orb3: string;
  title: string;
  accent: string;
  button: string;
  buttonShadow: string;
  cardHeader: string;
  text: string;
  textSecondary: string;
  focus: string;
};

const themes: Record<string, ThemeStyles> = {
  purple: {
    background: "from-violet-900 via-purple-900 to-blue-900",
    orb1: "from-purple-400 to-pink-400",
    orb2: "from-yellow-400 to-orange-400",
    orb3: "from-pink-400 to-red-400",
    title: "from-white via-purple-200 to-pink-200",
    accent: "from-purple-400 to-pink-400",
    button: "from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
    buttonShadow: "hover:shadow-purple-500/25",
    cardHeader: "from-purple-500/20 to-pink-500/20",
    text: "text-purple-100",
    textSecondary: "text-purple-200/70",
    focus: "focus:ring-purple-400",
  },
  ocean: {
    background: "from-slate-900 via-blue-900 to-cyan-900",
    orb1: "from-blue-400 to-cyan-400",
    orb2: "from-teal-400 to-blue-400",
    orb3: "from-cyan-400 to-indigo-400",
    title: "from-white via-cyan-200 to-blue-200",
    accent: "from-cyan-400 to-blue-400",
    button: "from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800",
    buttonShadow: "hover:shadow-cyan-500/25",
    cardHeader: "from-cyan-500/20 to-blue-500/20",
    text: "text-cyan-100",
    textSecondary: "text-cyan-200/70",
    focus: "focus:ring-cyan-400",
  },
  emerald: {
        background: "from-emerald-900 via-teal-900 to-green-900",
        orb1: "from-emerald-400 to-teal-400",
        orb2: "from-green-400 to-emerald-400",
        orb3: "from-teal-400 to-cyan-400",
        title: "from-white via-emerald-200 to-teal-200",
        accent: "from-emerald-400 to-teal-400",
        button: "from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800",
        buttonShadow: "hover:shadow-emerald-500/25",
        cardHeader: "from-emerald-500/20 to-teal-500/20",
        text: "text-emerald-100",
        textSecondary: "text-emerald-200/70",
        focus: "focus:ring-emerald-400"
      },
      rose: {
        background: "from-rose-900 via-pink-900 to-fuchsia-900",
        orb1: "from-rose-400 to-pink-400",
        orb2: "from-fuchsia-400 to-rose-400",
        orb3: "from-pink-400 to-purple-400",
        title: "from-white via-rose-200 to-pink-200",
        accent: "from-rose-400 to-pink-400",
        button: "from-rose-600 to-pink-700 hover:from-rose-700 hover:to-pink-800",
        buttonShadow: "hover:shadow-rose-500/25",
        cardHeader: "from-rose-500/20 to-pink-500/20",
        text: "text-rose-100",
        textSecondary: "text-rose-200/70",
        focus: "focus:ring-rose-400"
      },
      cosmic: {
        background: "from-indigo-900 via-purple-900 to-slate-900",
        orb1: "from-indigo-400 to-purple-400",
        orb2: "from-violet-400 to-indigo-400",
        orb3: "from-purple-400 to-slate-400",
        title: "from-white via-indigo-200 to-purple-200",
        accent: "from-indigo-400 to-purple-400",
        button: "from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800",
        buttonShadow: "hover:shadow-indigo-500/25",
        cardHeader: "from-indigo-500/20 to-purple-500/20",
        text: "text-indigo-100",
        textSecondary: "text-indigo-200/70",
        focus: "focus:ring-indigo-400"
      },
      pharma: {
        background: "from-blue-50 via-teal-100 to-white",
        orb1: "from-blue-300 to-teal-200",
        orb2: "from-green-200 to-blue-200",
        orb3: "from-teal-100 to-blue-100",
        title: "from-blue-900 via-teal-700 to-blue-600",
        accent: "from-blue-400 to-teal-400",
        button: "from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700",
        buttonShadow: "hover:shadow-blue-500/25",
        cardHeader: "from-blue-100/40 to-teal-100/40",
        text: "text-black",
        textSecondary: "text-black",
        focus: "focus:ring-blue-400"
      }
};

export default function getThemeStyles(name: string) {
  return themes[name] ?? themes.purple;
}
