import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Check, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { categories } from '@/data/mockData';
import { PageTransition } from '@/components/PageTransition';
import ItemPhoto from '@/components/ItemPhoto';

const OutfitsPage = () => {
  const { outfitsList, items } = useApp();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        <h1 className="font-heading text-2xl font-medium mb-4">My Outfits</h1>
        <div className="grid grid-cols-2 gap-3">
          {outfitsList.map(outfit => {
            const outfitItems = items.filter(i => outfit.items.includes(i.id));
            return (
              <button key={outfit.id} onClick={() => navigate(`/outfits/${outfit.id}`)} className="text-left">
                <div className="aspect-square rounded-xl bg-card p-2 grid grid-cols-2 gap-1 mb-2 card-shadow">
                  {outfitItems.slice(0, 4).map(item => (
                    <div key={item.id} className="rounded-lg flex items-center justify-center" style={{ backgroundColor: item.photos[0] }}>
                      <span className="text-[7px] label-caps opacity-40">{item.category}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-body font-medium truncate">{outfit.name}</p>
                <span className="px-2 py-0.5 rounded-full bg-card text-[10px] font-body text-muted-foreground">{outfit.occasion}</span>
              </button>
            );
          })}
        </div>
        <button onClick={() => navigate('/outfits/create')} className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg z-40">
          <Plus size={24} strokeWidth={1.5} className="text-primary-foreground" />
        </button>
      </div>
    </PageTransition>
  );
};

const CreateOutfitPage = () => {
  const { items, addOutfit } = useApp();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [outfitName, setOutfitName] = useState('');
  const [occasion, setOccasion] = useState('Casual');

  const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);
  const selectedItems = items.filter(i => selected.includes(i.id));

  const handleSave = () => {
    if (selected.length === 0) return;
    addOutfit({ id: `o-${Date.now()}`, name: outfitName || 'Untitled Outfit', occasion, items: selected, dateCreated: new Date().toISOString().split('T')[0] });
    navigate('/outfits');
  };

  return (
    <PageTransition>
      <div className="min-h-screen pb-44 px-5 pt-14">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)}><ArrowLeft size={22} strokeWidth={1.5} /></button>
          <h1 className="font-heading text-xl font-medium">Create Outfit</h1>
        </div>

        {/* Preview area */}
        <div className="bg-card rounded-2xl p-4 mb-5 min-h-[140px] card-shadow">
          {selectedItems.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">Select items to build your outfit</p>
          ) : (
            <div className="flex gap-2 flex-wrap justify-center">
              {selectedItems.map(item => (
                <div key={item.id} className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.photos[0] }}>
                  <span className="text-[7px] label-caps opacity-40">{item.subcategory}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-5 px-5 scrollbar-hide">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${activeCategory === cat ? 'bg-foreground text-background' : 'bg-card text-muted-foreground'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Item grid */}
        <div className="grid grid-cols-3 gap-2 mt-2">
          {filtered.map(item => {
            const isSelected = selected.includes(item.id);
            return (
              <button key={item.id} onClick={() => setSelected(isSelected ? selected.filter(s => s !== item.id) : [...selected, item.id])} className="relative">
                <ItemPhoto color={item.photos[0]} name="" className="aspect-square rounded-lg" />
                {isSelected && (
                  <div className="absolute inset-0 rounded-lg bg-foreground/20 flex items-center justify-center">
                    <Check size={20} strokeWidth={2} className="text-background" />
                  </div>
                )}
                <p className="text-[10px] font-body truncate mt-1">{item.name}</p>
              </button>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div className="fixed bottom-20 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border px-5 py-4 space-y-3 z-40">
          <input value={outfitName} onChange={e => setOutfitName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-sm font-body focus:outline-none" placeholder="Outfit name" />
          <div className="flex gap-3">
            <select value={occasion} onChange={e => setOccasion(e.target.value)} className="flex-1 px-3 py-2.5 rounded-xl bg-card border border-border text-sm font-body focus:outline-none">
              <option>Casual</option><option>Work</option><option>Formal</option><option>Evening</option><option>Travel</option>
            </select>
            <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-body font-medium">Save Outfit</button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const OutfitDetailPage = () => {
  const { id } = useParams();
  const { outfitsList, items, deleteOutfit } = useApp();
  const navigate = useNavigate();
  const outfit = outfitsList.find(o => o.id === id);

  if (!outfit) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Outfit not found</div>;

  const outfitItems = items.filter(i => outfit.items.includes(i.id));

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)}><ArrowLeft size={22} strokeWidth={1.5} /></button>
          <h1 className="font-heading text-xl font-medium">{outfit.name}</h1>
        </div>

        <div className="bg-card rounded-2xl p-4 mb-5 card-shadow">
          <div className="flex gap-2 flex-wrap justify-center">
            {outfitItems.map(item => (
              <div key={item.id} className="w-20 h-20 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.photos[0] }}>
                <span className="text-[8px] label-caps opacity-40">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <span className="px-2.5 py-1 rounded-full bg-card text-xs font-body text-muted-foreground">{outfit.occasion}</span>
          {outfit.styledBy && <p className="text-xs text-muted-foreground mt-2">Styled by {outfit.styledBy}</p>}
        </div>

        <span className="label-caps block mb-2">Items in this outfit</span>
        <div className="space-y-2 mb-6">
          {outfitItems.map(item => (
            <button key={item.id} onClick={() => navigate(`/wardrobe/${item.id}`)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-card card-shadow-sm text-left">
              <div className="w-12 h-12 rounded-lg flex-shrink-0" style={{ backgroundColor: item.photos[0] }} />
              <div>
                <p className="text-sm font-body font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.brand}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-xl border border-border text-sm font-body font-medium">Edit</button>
          <button className="flex-1 py-3 rounded-xl border border-border text-sm font-body font-medium">Share</button>
        </div>
        <button onClick={() => { deleteOutfit(outfit.id); navigate('/outfits'); }} className="w-full text-center text-destructive text-xs font-body py-4">Delete Outfit</button>
      </div>
    </PageTransition>
  );
};

export { OutfitsPage, CreateOutfitPage, OutfitDetailPage };
