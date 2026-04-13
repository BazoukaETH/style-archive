import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Plus, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { categories } from '@/data/mockData';
import { PageTransition } from '@/components/PageTransition';
import ItemPhoto from '@/components/ItemPhoto';

const WardrobePage = () => {
  const { items } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Derive available brands & colors based on current category
  const { brands, colors } = useMemo(() => {
    const pool = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);
    const brandSet = [...new Set(pool.map(i => i.brand))].sort();
    const colorSet = [...new Set(pool.map(i => i.color))].sort();
    return { brands: brandSet, colors: colorSet };
  }, [items, activeCategory]);

  // Reset brand/color if they're no longer available after category change
  const activeBrand = selectedBrand && brands.includes(selectedBrand) ? selectedBrand : null;
  const activeColor = selectedColor && colors.includes(selectedColor) ? selectedColor : null;
  const activeFilterCount = (activeBrand ? 1 : 0) + (activeColor ? 1 : 0);

  let filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);
  if (activeBrand) filtered = filtered.filter(i => i.brand === activeBrand);
  if (activeColor) filtered = filtered.filter(i => i.color === activeColor);
  if (search) filtered = filtered.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.brand.toLowerCase().includes(search.toLowerCase()));
  if (sort === 'az') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'category') filtered = [...filtered].sort((a, b) => a.category.localeCompare(b.category));

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        <h1 className="font-heading text-2xl font-medium mb-4">My Wardrobe</h1>

        {/* Search + Filter toggle */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={16} strokeWidth={1.5} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Search items..."
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center relative transition-colors ${showFilters ? 'bg-foreground text-background border-foreground' : 'bg-card border-border text-muted-foreground'}`}
          >
            <SlidersHorizontal size={16} strokeWidth={1.5} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-body flex items-center justify-center">{activeFilterCount}</span>
            )}
          </button>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-5 px-5 scrollbar-hide mb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${
                activeCategory === cat ? 'bg-foreground text-background' : 'bg-card text-muted-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Brand & Color filters */}
        {showFilters && (
          <div className="mb-4 p-4 rounded-2xl bg-card border border-border space-y-4">
            <div>
              <label className="label-caps mb-2 block">Brand</label>
              <div className="flex flex-wrap gap-1.5">
                {brands.map(b => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(activeBrand === b ? null : b)}
                    className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${activeBrand === b ? 'bg-foreground text-background' : 'bg-background text-muted-foreground'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label-caps mb-2 block">Color</label>
              <div className="flex flex-wrap gap-1.5">
                {colors.map(c => {
                  const item = items.find(i => i.color === c);
                  return (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(activeColor === c ? null : c)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${activeColor === c ? 'bg-foreground text-background' : 'bg-background text-muted-foreground'}`}
                    >
                      {item && <span className="w-3 h-3 rounded-full border border-border/50 flex-shrink-0" style={{ backgroundColor: item.colorHex }} />}
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
            {activeFilterCount > 0 && (
              <button onClick={() => { setSelectedBrand(null); setSelectedColor(null); }} className="text-xs text-muted-foreground font-body underline">
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Active filter pills */}
        {activeFilterCount > 0 && !showFilters && (
          <div className="flex gap-2 mb-3 flex-wrap">
            {activeBrand && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-xs font-body font-medium text-foreground">
                {activeBrand}
                <button onClick={() => setSelectedBrand(null)}><X size={12} strokeWidth={1.5} /></button>
              </span>
            )}
            {activeColor && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-xs font-body font-medium text-foreground">
                {activeColor}
                <button onClick={() => setSelectedColor(null)}><X size={12} strokeWidth={1.5} /></button>
              </span>
            )}
          </div>
        )}

        {/* Sort */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-muted-foreground font-body">{filtered.length} items</span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="text-xs text-muted-foreground bg-transparent font-body focus:outline-none"
          >
            <option value="recent">Recently Added</option>
            <option value="az">A-Z</option>
            <option value="category">Category</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(item => (
            <button key={item.id} onClick={() => navigate(`/wardrobe/${item.id}`)} className="text-left">
              <ItemPhoto color={item.photos[0]} name={item.name} className="mb-2" />
              <p className="text-sm font-body font-medium truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.brand}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-card text-[10px] font-body text-muted-foreground">{item.category}</span>
            </button>
          ))}
        </div>

        {/* FAB */}
        <button
          onClick={() => navigate('/add')}
          className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg z-40"
        >
          <Plus size={24} strokeWidth={1.5} className="text-primary-foreground" />
        </button>
      </div>
    </PageTransition>
  );
};

export default WardrobePage;
