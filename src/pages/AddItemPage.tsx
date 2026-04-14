import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Camera, Image, Zap, Check, ArrowLeft, Link, Clipboard, Sparkles, RotateCcw } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '@/context/AppContext';
import { categories, subcategories, seasons, occasionsList, commonColors } from '@/data/mockData';
import { PageTransition } from '@/components/PageTransition';

// Simulated AI detection results based on random photo
const aiDetections = [
  { category: 'Tops', subcategory: 'Knitwear', color: 'Cream', colorHex: '#F5F0E8', brand: 'COS', name: 'Cream Knit Sweater', seasons: ['Fall', 'Winter'], occasions: ['Casual', 'Work'] },
  { category: 'Bottoms', subcategory: 'Trousers', color: 'Black', colorHex: '#1A1A1A', brand: 'Theory', name: 'Black Tailored Trousers', seasons: ['Fall', 'Winter', 'Spring'], occasions: ['Work', 'Formal'] },
  { category: 'Outerwear', subcategory: 'Coats', color: 'Camel', colorHex: '#C4A882', brand: 'Max Mara', name: 'Camel Wool Coat', seasons: ['Fall', 'Winter'], occasions: ['Work', 'Casual'] },
  { category: 'Shoes', subcategory: 'Sneakers', color: 'White', colorHex: '#FAFAFA', brand: 'Common Projects', name: 'White Leather Sneakers', seasons: ['Spring', 'Summer'], occasions: ['Casual'] },
  { category: 'Bags', subcategory: 'Totes', color: 'Black', colorHex: '#1A1A1A', brand: 'Celine', name: 'Black Leather Tote', seasons: ['All Seasons'], occasions: ['Work', 'Casual'] },
  { category: 'Dresses', subcategory: 'Midi', color: 'Sage', colorHex: '#A8B89C', brand: 'Reformation', name: 'Sage Silk Midi Dress', seasons: ['Spring', 'Summer'], occasions: ['Evening', 'Formal'] },
];

const AddItemPage = () => {
  const navigate = useNavigate();
  const { addItem } = useApp();
  const [step, setStep] = useState<'photo' | 'smartTag' | 'details' | 'done'>('photo');
  const [photoColor] = useState(() => commonColors[Math.floor(Math.random() * commonColors.length)].hex);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoSource, setPhotoSource] = useState<'camera' | 'gallery' | 'screenshot' | 'url' | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  // AI detection state
  const [aiResult] = useState(() => aiDetections[Math.floor(Math.random() * aiDetections.length)]);
  const [analyzing, setAnalyzing] = useState(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSub] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [colorHex, setColorHex] = useState('');
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [newItemId, setNewItemId] = useState('');

  const toggleArr = (arr: string[], val: string, set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);

  // When entering smartTag step, simulate analysis
  useEffect(() => {
    if (step === 'smartTag') {
      setAnalyzing(true);
      const timer = setTimeout(() => {
        setAnalyzing(false);
        // Pre-fill from AI
        setName(aiResult.name);
        setCategory(aiResult.category);
        setSub(aiResult.subcategory);
        setBrand(aiResult.brand);
        setColor(aiResult.color);
        setColorHex(aiResult.colorHex);
        setSelectedSeasons(aiResult.seasons);
        setSelectedOccasions(aiResult.occasions);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [step, aiResult]);

  const handleSave = () => {
    const id = `item-${Date.now()}`;
    addItem({
      id, name: name || 'Untitled Item', brand: brand || 'Unknown', category: category || 'Tops',
      subcategory: subcategory || '', color: color || 'Black', colorHex: colorHex || '#1A1A1A',
      seasons: selectedSeasons, occasions: selectedOccasions,
      purchaseDate: new Date().toISOString().split('T')[0], price: Number(price) || 0,
      notes, photos: [photoColor], dateAdded: new Date().toISOString().split('T')[0],
    });
    setNewItemId(id);
    setStep('done');
  };

  // ─── PHOTO STEP ───
  if (step === 'photo') {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <div className="flex items-center justify-between px-5 pt-14 mb-4">
            <button onClick={() => navigate(-1)}><X size={22} strokeWidth={1.5} /></button>
            <span className="font-body text-sm font-medium">Add Item</span>
            <div className="w-6" />
          </div>
          {!hasPhoto ? (
            <>
              <div className="flex-1 mx-5 rounded-2xl bg-foreground/5 flex flex-col items-center justify-center gap-4 px-6">
                <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center">
                  <Camera size={32} strokeWidth={1.5} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm text-center">Add a photo of your item</p>
              </div>
              <div className="px-5 py-6 space-y-3">
                <div className="flex items-center justify-center gap-6">
                  <button onClick={() => { setPhotoSource('gallery'); setHasPhoto(true); }} className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
                      <Image size={18} strokeWidth={1.5} className="text-muted-foreground" />
                    </div>
                    <span className="text-[10px] font-body text-muted-foreground">Gallery</span>
                  </button>
                  <button onClick={() => { setPhotoSource('camera'); setHasPhoto(true); }} className="flex flex-col items-center gap-1.5">
                    <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary" />
                    </div>
                    <span className="text-[10px] font-body text-muted-foreground">Camera</span>
                  </button>
                  <button onClick={() => { setPhotoSource('screenshot'); setHasPhoto(true); }} className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
                      <Clipboard size={18} strokeWidth={1.5} className="text-muted-foreground" />
                    </div>
                    <span className="text-[10px] font-body text-muted-foreground">Screenshot</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[10px] font-body text-muted-foreground uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="relative">
                  <Link size={14} strokeWidth={1.5} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input value={imageUrl} onChange={e => setImageUrl(e.target.value)}
                    className="w-full pl-10 pr-20 py-3 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Paste image URL..." />
                  {imageUrl && (
                    <button onClick={() => { setPhotoSource('url'); setHasPhoto(true); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-body font-medium">
                      Use
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 mx-5 rounded-2xl flex flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: photoColor }}>
                <span className="label-caps opacity-40">
                  {photoSource === 'screenshot' ? 'Screenshot Preview' : photoSource === 'url' ? 'Web Image Preview' : 'Photo Preview'}
                </span>
                {photoSource && (
                  <span className="mt-2 px-2.5 py-1 rounded-full bg-background/60 text-[10px] font-body text-foreground/60 capitalize">
                    {photoSource === 'url' ? 'From URL' : `From ${photoSource}`}
                  </span>
                )}
              </div>
              <div className="px-5 py-6 flex gap-3">
                <button onClick={() => { setHasPhoto(false); setPhotoSource(null); }} className="flex-1 py-3 rounded-xl border border-border text-sm font-body font-medium">Change</button>
                <button onClick={() => setStep('smartTag')} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-body font-medium">Use Photo</button>
              </div>
            </>
          )}
        </div>
      </PageTransition>
    );
  }

  // ─── SMART TAG STEP (new!) ───
  if (step === 'smartTag') {
    return (
      <PageTransition>
        <div className="min-h-screen pb-24 px-5 pt-14">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => { setStep('photo'); setHasPhoto(true); }}><ArrowLeft size={22} strokeWidth={1.5} /></button>
            <span className="font-body text-sm font-medium">Smart Tag</span>
            <div className="w-6" />
          </div>

          {/* Photo + analyzing overlay */}
          <div className="relative w-full aspect-square rounded-2xl mb-5 flex items-center justify-center overflow-hidden" style={{ backgroundColor: photoColor }}>
            {analyzing && (
              <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-10">
                <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-background text-sm font-body font-medium">Analyzing your item…</p>
              </div>
            )}
            {!analyzing && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/20 z-10">
                <Check size={12} strokeWidth={2} className="text-success" />
                <span className="text-[10px] font-body font-medium text-success">Detected</span>
              </div>
            )}
          </div>

          {!analyzing && (
            <>
              {/* AI Result Banner */}
              <div className="bg-card rounded-2xl p-4 mb-5 card-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} strokeWidth={1.5} className="text-primary" />
                  <span className="text-xs font-body font-medium">We think this is…</span>
                </div>
                <h2 className="font-heading text-xl font-medium mb-3">{name}</h2>

                {/* Quick-edit chips */}
                <div className="space-y-3">
                  {/* Category */}
                  <div>
                    <span className="label-caps mb-1.5 block">Category</span>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.filter(c => c !== 'All').map(c => (
                        <button key={c} onClick={() => { setCategory(c); setSub(''); }}
                          className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${category === c ? 'bg-foreground text-background' : 'bg-background text-muted-foreground'}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subcategory */}
                  {category && subcategories[category] && (
                    <div>
                      <span className="label-caps mb-1.5 block">Type</span>
                      <div className="flex flex-wrap gap-1.5">
                        {subcategories[category].map(s => (
                          <button key={s} onClick={() => setSub(s)}
                            className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${subcategory === s ? 'bg-foreground text-background' : 'bg-background text-muted-foreground'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color */}
                  <div>
                    <span className="label-caps mb-1.5 block">Color</span>
                    <div className="flex flex-wrap gap-2">
                      {commonColors.map(c => (
                        <button key={c.name} onClick={() => { setColor(c.name); setColorHex(c.hex); }}
                          className={`w-7 h-7 rounded-full border-2 transition-all ${color === c.name ? 'border-foreground scale-110' : 'border-transparent'}`}
                          style={{ backgroundColor: c.hex }} title={c.name} />
                      ))}
                    </div>
                  </div>

                  {/* Seasons */}
                  <div>
                    <span className="label-caps mb-1.5 block">Season</span>
                    <div className="flex flex-wrap gap-1.5">
                      {seasons.map(s => (
                        <button key={s} onClick={() => toggleArr(selectedSeasons, s, setSelectedSeasons)}
                          className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${selectedSeasons.includes(s) ? 'bg-foreground text-background' : 'bg-background text-muted-foreground'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Occasions */}
                  <div>
                    <span className="label-caps mb-1.5 block">Occasion</span>
                    <div className="flex flex-wrap gap-1.5">
                      {occasionsList.map(o => (
                        <button key={o} onClick={() => toggleArr(selectedOccasions, o, setSelectedOccasions)}
                          className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${selectedOccasions.includes(o) ? 'bg-foreground text-background' : 'bg-background text-muted-foreground'}`}>
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button onClick={handleSave} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide flex items-center justify-center gap-2">
                  <Sparkles size={16} strokeWidth={1.5} />
                  Quick Save
                </button>
                <button onClick={() => setStep('details')} className="w-full py-3 rounded-xl border border-border text-sm font-body font-medium text-muted-foreground">
                  Add More Details
                </button>
                <button onClick={() => {
                  setName(''); setCategory(''); setSub(''); setBrand(''); setColor(''); setColorHex('');
                  setSelectedSeasons([]); setSelectedOccasions([]);
                  setStep('details');
                }} className="w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground py-2">
                  <RotateCcw size={12} strokeWidth={1.5} />
                  Start from scratch
                </button>
              </div>
            </>
          )}
        </div>
      </PageTransition>
    );
  }

  // ─── DONE STEP ───
  if (step === 'done') {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-6">
            <Check size={32} strokeWidth={1.5} className="text-success" />
          </div>
          <h2 className="font-heading text-2xl font-medium mb-2">Item Added!</h2>
          <p className="text-muted-foreground text-sm mb-8">Your item has been added to your wardrobe</p>
          <div className="bg-card rounded-2xl p-6 w-full mb-6 flex flex-col items-center card-shadow">
            <div className="w-24 h-24 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: photoColor }}>
              <span className="label-caps opacity-40 text-[8px]">{name || 'Item'}</span>
            </div>
            <QRCodeSVG value={`taqm://item/${newItemId}`} size={80} />
            <p className="text-xs text-muted-foreground mt-2">Scan to view item</p>
          </div>
          <div className="w-full space-y-3">
            <button className="w-full py-3 rounded-xl border border-border text-sm font-body font-medium">Download Tag</button>
            <button onClick={() => navigate('/order-tags')} className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-body font-medium">Order Printed Tag</button>
            <button onClick={() => { setStep('photo'); setHasPhoto(false); setName(''); setCategory(''); setBrand(''); }} className="w-full py-3 rounded-xl border border-border text-sm font-body font-medium">Add Another Item</button>
            <button onClick={() => navigate('/wardrobe')} className="w-full text-center text-muted-foreground text-sm py-2">Go to Wardrobe</button>
          </div>
        </div>
      </PageTransition>
    );
  }

  // ─── DETAILS STEP ───
  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setStep('smartTag')}><ArrowLeft size={22} strokeWidth={1.5} /></button>
          <span className="font-body text-sm font-medium">Item Details</span>
          <div className="w-6" />
        </div>

        <div className="flex gap-2 mb-4">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: photoColor }} />
        </div>

        {/* AI detection banner */}
        <div className="bg-card rounded-xl p-3 flex items-center gap-3 mb-5 card-shadow">
          <Zap size={16} strokeWidth={1.5} className="text-primary flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-body font-medium">Detected: {category || 'Top'} / {color || 'Cream'} / {subcategory || 'Knitwear'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label-caps mb-1.5 block">Item Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Cream Cashmere Sweater" />
          </div>
          <div>
            <label className="label-caps mb-1.5 block">Category</label>
            <select value={category} onChange={e => { setCategory(e.target.value); setSub(''); }} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-body focus:outline-none">
              <option value="">Select category</option>
              {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {category && subcategories[category] && (
            <div>
              <label className="label-caps mb-1.5 block">Subcategory</label>
              <select value={subcategory} onChange={e => setSub(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-body focus:outline-none">
                <option value="">Select subcategory</option>
                {subcategories[category].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}
          <div>
            <label className="label-caps mb-1.5 block">Brand</label>
            <input value={brand} onChange={e => setBrand(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. COS" />
          </div>
          <div>
            <label className="label-caps mb-1.5 block">Color</label>
            <div className="flex flex-wrap gap-2">
              {commonColors.map(c => (
                <button key={c.name} onClick={() => { setColor(c.name); setColorHex(c.hex); }}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${color === c.name ? 'border-foreground scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c.hex }} title={c.name} />
              ))}
            </div>
          </div>
          <div>
            <label className="label-caps mb-1.5 block">Season</label>
            <div className="flex flex-wrap gap-2">
              {seasons.map(s => (
                <button key={s} onClick={() => toggleArr(selectedSeasons, s, setSelectedSeasons)}
                  className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${selectedSeasons.includes(s) ? 'bg-foreground text-background' : 'bg-card text-muted-foreground'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label-caps mb-1.5 block">Occasion</label>
            <div className="flex flex-wrap gap-2">
              {occasionsList.map(o => (
                <button key={o} onClick={() => toggleArr(selectedOccasions, o, setSelectedOccasions)}
                  className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${selectedOccasions.includes(o) ? 'bg-foreground text-background' : 'bg-card text-muted-foreground'}`}>
                  {o}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label-caps mb-1.5 block">Price</label>
            <input value={price} onChange={e => setPrice(e.target.value)} type="number" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary" placeholder="$0" />
          </div>
          <div>
            <label className="label-caps mb-1.5 block">Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary resize-none" rows={3} placeholder="Care instructions, fit notes..." />
          </div>
          <button onClick={handleSave} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide">Save Item</button>
        </div>
      </div>
    </PageTransition>
  );
};

export default AddItemPage;
