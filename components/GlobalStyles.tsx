export default function GlobalStyles() {
  return (
    <style jsx global>{`
      @keyframes blob {
        0% {
          transform: translate(0px, 0px) scale(1);
        }
        33% {
          transform: translate(30px, -50px) scale(1.1);
        }
        66% {
          transform: translate(-20px, 20px) scale(0.9);
        }
        100% {
          transform: translate(0px, 0px) scale(1);
        }
      }
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes slide-up {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      .animate-fade-in {
        animation: fade-in 1s ease-out;
      }
      .animate-slide-up {
        animation: slide-up 0.8s ease-out;
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.6s ease-out;
      }
      .animation-delay-200 {
        animation-delay: 200ms;
      }
      .animation-delay-400 {
        animation-delay: 400ms;
      }
      .animation-delay-1000 {
        animation-delay: 1000ms;
      }
      .animation-delay-2000 {
        animation-delay: 2000ms;
      }
      .animation-delay-4000 {
        animation-delay: 4000ms;
      }
    `}</style>
  );
}
