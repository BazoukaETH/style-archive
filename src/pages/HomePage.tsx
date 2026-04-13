import { useNavigate } from 'react-router-dom';
import { Bell, Plus, Sparkles, Users } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PageTransition } from '@/components/PageTransition';
import ItemPhoto from '@/components/ItemPhoto';

const HomePage = () => {
  const { items, outfitsList } = useApp();
  const navigate = useNavigate();
  const recentItems = items.slice(0, 5);
  const featuredOutfit = outfitsList[0];
  const featuredItems = featuredOutfit ? items.filter(i => featuredOutfit.items.includes(i.id)) : [];

  const categoryCounts: Record<string, number> = {};
  items.forEach(i => { categoryCounts[i.category] = (categoryCounts[i.category] || 0) + 1; });

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground text-xs font-body">Good morning,</p>
            <h1 className="font-heading text-2xl font-medium">Sarah</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
            </button>
            <div className="w-9 h-9 rounded-full bg-card flex items-center justify-center">
              <span className="text-xs font-medium">SA</span>
            </div>
          </div>
        </div>

        {/* Wardrobe Summary */}
        <div className="bg-card rounded-2xl p-5 mb-6 card-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="label-caps">Your Wardrobe</span>
            <span className="font-heading text-2xl font-medium">{items.length}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <span key={cat} className="px-2.5 py-1 rounded-full bg-background text-[11px] font-body text-muted-foreground">
                {cat} ({count})
              </span>
            ))}
          </div>
        </div>

        {/* Recently Added */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-lg font-medium">Recently Added</h2>
            <button onClick={() => navigate('/wardrobe')} className="text-xs text-muted-foreground">See all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {recentItems.map(item => (
              <button key={item.id} onClick={() => navigate(`/wardrobe/${item.id}`)} className="flex-shrink-0 w-28">
                <ItemPhoto color={item.photos[0]} name={item.name} className="w-28 h-28 rounded-xl mb-1.5" />
                <p className="text-xs font-body font-medium truncate">{item.name}</p>
                <span className="label-caps">{item.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Outfit of the Day */}
        {featuredOutfit && (
          <div className="mb-6">
            <h2 className="font-heading text-lg font-medium mb-3">Outfit of the Day</h2>
            <button onClick={() => navigate(`/outfits/${featuredOutfit.id}`)} className="w-full bg-card rounded-2xl p-4 card-shadow text-left">
              <div className="flex gap-2 mb-3">
                {featuredItems.slice(0, 4).map(item => (
                  <ItemPhoto key={item.id} color={item.photos[0]} name="" className="w-16 h-16 rounded-lg" />
                ))}
              </div>
              <p className="font-body font-medium text-sm">{featuredOutfit.name}</p>
              {featuredOutfit.styledBy && (
                <p className="text-xs text-muted-foreground mt-1">Styled by {featuredOutfit.styledBy}</p>
              )}
            </button>
          </div>
        )}

        {/* Style Tip */}
        <div className="bg-card rounded-2xl p-5 mb-6 card-shadow">
          <div className="flex items-start gap-3">
            <Sparkles size={18} strokeWidth={1.5} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-body font-medium mb-1">Seasonal Tip</p>
              <p className="text-xs text-muted-foreground leading-relaxed">Layer your cream cashmere sweater under the camel coat for a tonal winter look. Add gold accessories to elevate.</p>
              <button className="text-xs text-primary font-medium mt-2">Discover More</button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Plus, label: 'Add Item', path: '/add' },
            { icon: Sparkles, label: 'Create Outfit', path: '/outfits/create' },
            { icon: Users, label: 'Book Stylist', path: '/stylists' },
          ].map(({ icon: Icon, label, path }) => (
            <button key={label} onClick={() => navigate(path)} className="bg-card rounded-2xl p-4 flex flex-col items-center gap-2 card-shadow">
              <Icon size={20} strokeWidth={1.5} className="text-primary" />
              <span className="text-[11px] font-body font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default HomePage;
