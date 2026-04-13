import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Search, MapPin, Check, Calendar, MessageCircle, ChevronRight } from 'lucide-react';
import { stylists } from '@/data/mockData';
import { PageTransition } from '@/components/PageTransition';

const StylistBrowsePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Wardrobe Organization', 'Personal Shopping', 'Event Styling', 'Seasonal Refresh'];

  const filtered = search ? stylists.filter(s => s.name.toLowerCase().includes(search.toLowerCase())) : stylists;

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)}><ArrowLeft size={22} strokeWidth={1.5} /></button>
          <h1 className="font-heading text-2xl font-medium">Find a Stylist</h1>
        </div>

        <div className="relative mb-4">
          <Search size={16} strokeWidth={1.5} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Search stylists..." />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 -mx-5 px-5 scrollbar-hide mb-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${filter === f ? 'bg-foreground text-background' : 'bg-card text-muted-foreground'}`}>{f}</button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(stylist => (
            <button key={stylist.id} onClick={() => navigate(`/stylists/${stylist.id}`)} className="w-full bg-card rounded-2xl p-4 card-shadow text-left">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: stylist.avatar }}>
                  <span className="text-xs font-medium text-background/80">{stylist.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-sm">{stylist.name}</p>
                  <p className="text-xs text-muted-foreground">{stylist.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={12} strokeWidth={1.5} className="text-primary fill-primary" />
                    <span className="text-xs font-body font-medium">{stylist.rating}</span>
                    <span className="text-xs text-muted-foreground">({stylist.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{stylist.bio}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-body font-medium">From ${stylist.priceFrom} / session</span>
                <span className="text-xs text-primary font-medium flex items-center gap-0.5">View Profile <ChevronRight size={14} /></span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

const StylistProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const stylist = stylists.find(s => s.id === id);

  if (!stylist) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Stylist not found</div>;

  return (
    <PageTransition>
      <div className="min-h-screen pb-24">
        {/* Hero */}
        <div className="relative h-48 flex items-center justify-center" style={{ backgroundColor: stylist.avatar }}>
          <button onClick={() => navigate(-1)} className="absolute top-12 left-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <span className="text-3xl font-heading text-background/60">{stylist.name.split(' ').map(n => n[0]).join('')}</span>
        </div>

        <div className="px-5 pt-5 space-y-5">
          <div>
            <h1 className="font-heading text-2xl font-medium">{stylist.name}</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin size={12} strokeWidth={1.5} />{stylist.location}</p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{stylist.bio}</p>

          {/* Stats */}
          <div className="flex gap-4">
            {[
              { label: 'Clients', value: `${stylist.clients}+` },
              { label: 'Rating', value: stylist.rating.toString() },
              { label: 'On taqm', value: `${stylist.yearsOnPlatform} yrs` },
            ].map(s => (
              <div key={s.label} className="flex-1 bg-card rounded-xl p-3 text-center card-shadow-sm">
                <p className="font-heading text-lg font-medium">{s.value}</p>
                <p className="label-caps">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <h2 className="font-heading text-lg font-medium mb-3">Services</h2>
            <div className="space-y-3">
              {stylist.services.map(service => (
                <div key={service.id} className="bg-card rounded-xl p-4 card-shadow-sm">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-body font-medium text-sm">{service.name}</p>
                    <span className="font-heading text-lg font-medium">${service.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{service.description}</p>
                  <span className="label-caps">{service.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="font-heading text-lg font-medium mb-3">Reviews</h2>
            <div className="space-y-3">
              {stylist.reviews.map((review, i) => (
                <div key={i} className="bg-card rounded-xl p-4 card-shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-body font-medium text-sm">{review.name}</p>
                    <div className="flex items-center gap-1">
                      <Star size={12} strokeWidth={1.5} className="text-primary fill-primary" />
                      <span className="text-xs">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{review.text}</p>
                  <p className="label-caps mt-2">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky book button */}
        <div className="fixed bottom-20 left-0 right-0 px-5 pb-2 z-40">
          <button onClick={() => navigate(`/stylists/${stylist.id}/book`)} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide shadow-lg">
            Book {stylist.name.split(' ')[0]}
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const stylist = stylists.find(s => s.id === id);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');

  if (!stylist) return null;

  const service = stylist.services.find(s => s.id === selectedService);
  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1);
    return d.toISOString().split('T')[0];
  });

  if (step === 5) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-6">
            <Check size={32} strokeWidth={1.5} className="text-success" />
          </div>
          <h2 className="font-heading text-2xl font-medium mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground text-sm mb-6 text-center">Your session with {stylist.name} has been booked</p>
          <div className="bg-card rounded-2xl p-5 w-full mb-6 card-shadow space-y-2 text-sm">
            <p><span className="text-muted-foreground">Service:</span> {service?.name}</p>
            <p><span className="text-muted-foreground">Date:</span> {selectedDate}</p>
            <p><span className="text-muted-foreground">Time:</span> {selectedTime}</p>
            <p><span className="text-muted-foreground">Price:</span> ${service?.price}</p>
          </div>
          <div className="w-full space-y-3">
            <button className="w-full py-3 rounded-xl border border-border text-sm font-body font-medium flex items-center justify-center gap-2"><Calendar size={16} strokeWidth={1.5} />Add to Calendar</button>
            <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-body font-medium flex items-center justify-center gap-2"><MessageCircle size={16} strokeWidth={1.5} />Message Stylist</button>
            <button onClick={() => navigate('/home')} className="w-full text-center text-muted-foreground text-sm py-2">Back to Home</button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 px-5 pt-14">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => step > 1 ? setStep(s => s - 1) : navigate(-1)}><ArrowLeft size={22} strokeWidth={1.5} /></button>
          <h1 className="font-heading text-xl font-medium">Book {stylist.name.split(' ')[0]}</h1>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-6">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-border'}`} />
          ))}
        </div>

        {step === 1 && (
          <div>
            <h2 className="font-heading text-lg mb-3">Select Service</h2>
            <div className="space-y-3">
              {stylist.services.map(s => (
                <button key={s.id} onClick={() => { setSelectedService(s.id); setStep(2); }}
                  className={`w-full text-left bg-card rounded-xl p-4 card-shadow-sm border-2 transition-colors ${selectedService === s.id ? 'border-primary' : 'border-transparent'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-body font-medium text-sm">{s.name}</p>
                    <span className="font-heading text-lg font-medium">${s.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                  <span className="label-caps mt-1 inline-block">{s.duration}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-heading text-lg mb-3">Pick Date & Time</h2>
            <span className="label-caps block mb-2">Date</span>
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-4">
              {dates.map(d => {
                const date = new Date(d);
                return (
                  <button key={d} onClick={() => setSelectedDate(d)}
                    className={`flex-shrink-0 w-16 py-3 rounded-xl text-center transition-colors ${selectedDate === d ? 'bg-foreground text-background' : 'bg-card'}`}>
                    <p className="text-[10px] font-body">{date.toLocaleDateString('en', { weekday: 'short' })}</p>
                    <p className="font-heading text-lg font-medium">{date.getDate()}</p>
                  </button>
                );
              })}
            </div>
            <span className="label-caps block mb-2">Time</span>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {times.map(t => (
                <button key={t} onClick={() => setSelectedTime(t)}
                  className={`py-2.5 rounded-xl text-xs font-body font-medium transition-colors ${selectedTime === t ? 'bg-foreground text-background' : 'bg-card'}`}>{t}</button>
              ))}
            </div>
            {selectedDate && selectedTime && (
              <button onClick={() => setStep(3)} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body font-medium text-sm">Continue</button>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-heading text-lg mb-3">Add Notes</h2>
            <p className="text-sm text-muted-foreground mb-3">Tell your stylist what you need help with</p>
            <textarea value={bookingNotes} onChange={e => setBookingNotes(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary resize-none" rows={5} placeholder="I'm looking for help with..." />
            <button onClick={() => setStep(4)} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body font-medium text-sm mt-6">Review Booking</button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="font-heading text-lg mb-4">Review & Confirm</h2>
            <div className="bg-card rounded-2xl p-5 card-shadow space-y-3 text-sm mb-6">
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{service?.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Stylist</span><span className="font-medium">{stylist.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{selectedDate}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{selectedTime}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium">{service?.duration}</span></div>
              <div className="border-t border-border pt-3 flex justify-between"><span className="font-medium">Total</span><span className="font-heading text-xl font-medium">${service?.price}</span></div>
            </div>
            <button onClick={() => setStep(5)} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body font-medium text-sm">Confirm Booking</button>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export { StylistBrowsePage, StylistProfilePage, BookingPage };
