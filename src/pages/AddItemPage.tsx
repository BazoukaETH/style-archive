import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Camera, Image, Zap, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '@/context/AppContext';
import { categories, subcategories, seasons, occasionsList, commonColors } from '@/data/mockData';
import { PageTransition } from '@/components/PageTransition';

const AddItemPage = () => {
  const navigate = useNavigate();
  const { addItem } = useApp();
  const [step, setStep] = useState<'photo' | 'details' | 'done'>('photo');
  const [photoColor] = useState(() => commonColors[Math.floor(Math.random() * commonColors.length)].hex);
  const [hasPhoto, setHasPhoto] = useState(false);

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
              <div className="flex-1 mx-5 rounded-2xl bg-foreground/5 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center">
                  <Camera size={32} strokeWidth={1.5} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">Take a photo of your item</p>
              </div>
              <div className="px-5 py-6 flex items-center justify-center gap-8">
                <button onClick={() => setHasPhoto(true)} className="w-10 h-10 rounded-lg bg-card flex items-center justify-center"><Image size={18} strokeWidth={1.5} /></button>
                <button onClick={() => setHasPhoto(true)} className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary" />
                </button>
                <div className="w-10" />
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 mx-5 rounded-2xl flex items-center justify-center" style={{ backgroundColor: photoColor }}>
                <span className="label-caps opacity-40">Photo Preview</span>
              </div>
              <div className="px-5 py-6 flex gap-3">
                <button onClick={() => setHasPhoto(false)} className="flex-1 py-3 rounded-xl border border-border text-sm font-body font-medium">Retake</button>
                <button onClick={() => setStep('details')} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-body font-medium">Use Photo</button>
              </div>
            </>
          )}
        </div>
      </PageTransition>
    );
  }

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

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setStep('photo')}><ArrowLeft size={22} strokeWidth={1.5} /></button>
          <span className="font-body text-sm font-medium">Item Details</span>
          <div className="w-6" />
        </div>

        {/* Photo thumbnails */}
        <div className="flex gap-2 mb-4">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: photoColor }} />
        </div>

        {/* AI detection banner */}
        <div className="bg-card rounded-xl p-3 flex items-center gap-3 mb-5 card-shadow">
          <Zap size={16} strokeWidth={1.5} className="text-primary flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-body font-medium">We detected: Top / Cream / Knitwear</p>
          </div>
          <button className="text-xs text-primary font-medium" onClick={() => { setCategory('Tops'); setSub('Knitwear'); setColor('Cream'); setColorHex('#F5F0E8'); }}>Apply</button>
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

// Need to import ArrowLeft
import { ArrowLeft } from 'lucide-react';

export default AddItemPage;
