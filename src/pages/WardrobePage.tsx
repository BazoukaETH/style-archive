import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
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

  let filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);
  if (search) filtered = filtered.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.brand.toLowerCase().includes(search.toLowerCase()));
  if (sort === 'az') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'category') filtered = [...filtered].sort((a, b) => a.category.localeCompare(b.category));

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        <h1 className="font-heading text-2xl font-medium mb-4">My Wardrobe</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} strokeWidth={1.5} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search items..."
          />
        </div>

        {/* Filters */}
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

        {/* Sort */}
        <div className="flex justify-end mb-3">
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
