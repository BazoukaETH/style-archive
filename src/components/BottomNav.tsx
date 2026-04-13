import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Grid3X3, PlusCircle, Layers, User } from 'lucide-react';

const tabs = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/wardrobe', icon: Grid3X3, label: 'Wardrobe' },
  { path: '/add', icon: PlusCircle, label: 'Add', special: true },
  { path: '/outfits', icon: Layers, label: 'Outfits' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on onboarding/auth screens
  const hiddenPaths = ['/', '/onboarding', '/signup', '/signin'];
  if (hiddenPaths.includes(location.pathname)) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="max-w-[390px] mx-auto flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.map(({ path, icon: Icon, label, special }) => {
          const active = location.pathname.startsWith(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                special ? '' : active ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {special ? (
                <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center -mt-3 shadow-lg">
                  <Icon size={22} strokeWidth={1.5} className="text-primary-foreground" />
                </div>
              ) : (
                <Icon size={22} strokeWidth={1.5} />
              )}
              <span className="text-[10px] font-body font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
