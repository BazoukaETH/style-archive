import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Layers, Trash2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '@/context/AppContext';
import { PageTransition } from '@/components/PageTransition';

const ItemDetailPage = () => {
  const { id } = useParams();
  const { items, deleteItem } = useApp();
  const navigate = useNavigate();
  const item = items.find(i => i.id === id);

  if (!item) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Item not found</div>;

  return (
    <PageTransition>
      <div className="min-h-screen pb-24">
        {/* Hero photo */}
        <div className="relative w-full aspect-[3/4] flex items-center justify-center" style={{ backgroundColor: item.photos[0] }}>
          <button onClick={() => navigate(-1)} className="absolute top-12 left-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <span className="label-caps opacity-40">{item.name}</span>
        </div>

        <div className="px-5 pt-5 space-y-4">
          <div>
            <h1 className="font-heading text-2xl font-medium">{item.name}</h1>
            <p className="text-muted-foreground text-sm">{item.brand}</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div><span className="label-caps block mb-0.5">Category</span>{item.category} › {item.subcategory}</div>
            <div><span className="label-caps block mb-0.5">Color</span><span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: item.colorHex }} />{item.color}</span></div>
          </div>

          <div>
            <span className="label-caps block mb-1.5">Seasons</span>
            <div className="flex flex-wrap gap-1.5">{item.seasons.map(s => <span key={s} className="px-2.5 py-1 rounded-full bg-card text-xs font-body">{s}</span>)}</div>
          </div>
          <div>
            <span className="label-caps block mb-1.5">Occasions</span>
            <div className="flex flex-wrap gap-1.5">{item.occasions.map(o => <span key={o} className="px-2.5 py-1 rounded-full bg-card text-xs font-body">{o}</span>)}</div>
          </div>

          <div className="flex gap-6 text-sm">
            <div><span className="label-caps block mb-0.5">Purchased</span>{new Date(item.purchaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
            <div><span className="label-caps block mb-0.5">Price</span>${item.price}</div>
          </div>

          {item.notes && (
            <div>
              <span className="label-caps block mb-0.5">Notes</span>
              <p className="text-sm text-muted-foreground">{item.notes}</p>
            </div>
          )}

          {/* QR Code */}
          <div className="border-t border-border pt-4">
            <span className="label-caps block mb-3">Item Tag</span>
            <div className="flex items-center gap-4">
              <div className="bg-background p-3 rounded-xl border border-border">
                <QRCodeSVG value={`taqm://item/${item.id}`} size={80} />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <button onClick={() => navigate(`/tags/preview/${item.id}`)} className="px-4 py-2.5 rounded-xl border border-border text-xs font-body font-medium">Download Tag</button>
                <button onClick={() => navigate('/order-tags')} className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-body font-medium">Order Printed Tag</button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-3 rounded-xl border border-border text-sm font-body font-medium flex items-center justify-center gap-2">
              <Edit size={16} strokeWidth={1.5} /> Edit
            </button>
            <button onClick={() => navigate('/outfits/create')} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-body font-medium flex items-center justify-center gap-2">
              <Layers size={16} strokeWidth={1.5} /> Add to Outfit
            </button>
          </div>
          <button
            onClick={() => { deleteItem(item.id); navigate('/wardrobe'); }}
            className="w-full text-center text-destructive text-xs font-body py-2"
          >
            <Trash2 size={14} strokeWidth={1.5} className="inline mr-1" />Delete Item
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default ItemDetailPage;
