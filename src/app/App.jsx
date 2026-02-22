import { SlotMachine } from './components/SlotMachine';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            💕
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <SlotMachine />
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}