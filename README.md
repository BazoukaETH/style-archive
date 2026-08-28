# Style Archive

Build a complete mobile-first wardrobe management app called "Taqm" (working name - client can rename). This is a full-flow prototype where every screen and user journey is built out with realistic UI, placeholder data, and smooth navigation. Not everything needs a working backend but every screen, interaction, and transition should feel like a real production app.

Design Direction

Aesthetic: Ultra-clean luxury minimal. Think The Row meets Apple. The app should feel like a high-end fashion platform, not a utility tool.

Color Palette:

Background: warm white #FAF9F7

Secondary background / cards: #F3F1EE

Subtle borders and dividers: #E8E5E0

Primary text: #1A1A1A

Secondary text: #8A8680

Accent (used very sparingly - CTAs and highlights only): #C4A882 (warm gold/camel)

Error/destructive: #C45C5C

Success: #7BA68A

Typography: Use "Cormorant Garamond" for headings and display text (elegant serif). Use "DM Sans" for body text, labels, and UI elements (clean geometric sans). All caps letter-spacing on small labels and category tags.

Design Rules:

Generous whitespace everywhere. Let elements breathe.

Soft rounded corners (12-16px) on cards and buttons.

No harsh shadows. Use very subtle box-shadows (0 2px 8px rgba(0,0,0,0.04)).

Photography is the hero - make item photos large and prominent.

Thin hairline dividers, not heavy borders.

Icons should be thin line-weight (use Lucide icons, stroke-width 1.5).

Bottom tab navigation with 5 tabs: Home, Wardrobe, Add (+), Outfits, Profile.

Smooth page transitions and micro-interactions on buttons and cards.

Mobile viewport only (390px width). Show it in a phone frame or just design at mobile width.

Complete Screen-by-Screen Specification

1. ONBOARDING FLOW

1.1 Welcome / Splash Screen

Full-screen warm white background

App logo centered (simple wordmark "closett" in Cormorant Garamond, lowercase, tracked out)

Subtle tagline underneath: "Your wardrobe, curated."

"Get Started" button at bottom (accent color, full width, rounded)

"Already have an account? Sign in" text link below

1.2 Onboarding Carousel (3 steps)

Step 1: Illustration area (use a placeholder elegant fashion illustration or abstract shape) + headline "Catalog Everything" + body text "Photograph every piece in your wardrobe. Clothes, shoes, bags, accessories - all in one place."

Step 2: "Tag & Organize" + "Generate unique tags for each item. Print at home or let us handle it for you."

Step 3: "Style with Experts" + "Connect with personal stylists who can create looks from your own wardrobe."

Dot indicators at bottom, "Next" button, "Skip" text link

Final step shows "Enter Your Closet" button

1.3 Sign Up Screen

Clean form: Full name, Email, Password

"Create Account" button

Divider with "or"

Social login buttons (Google, Apple) - styled as outlined/ghost buttons

"Already have an account? Sign in" at bottom

1.4 Sign In Screen

Email + Password fields

"Sign In" button

"Forgot password?" link

Social login options

"New here? Create account" at bottom

2. HOME / DASHBOARD

2.1 Home Screen

Top: "Good morning, Sarah" greeting (use placeholder name) with small profile avatar on the right

Notification bell icon top right (with subtle dot indicator)

Wardrobe Summary Card: A clean horizontal card showing:

Total items: 127

Categories shown as small pills: Tops (34), Bottoms (22), Dresses (18), Shoes (28), Bags (15), Accessories (10)

Recently Added Section:

Horizontal scrollable row of item cards (show 4-5 items)

Each card: square photo, item name below, category tag

"See all" link on section header

Outfit of the Day Section:

A featured outfit card - larger format showing a styled combination

Stylist attribution: "Styled by Nour H." with small avatar

Tap to view full outfit breakdown

Style Tip Card:

Minimal card with a short style tip or seasonal suggestion

"Discover More" link

Quick Actions Row:

Three quick action buttons in a row: "Add Item", "Create Outfit", "Book Stylist"

Each with a thin-line icon and label below

3. WARDROBE (GALLERY)

3.1 Main Wardrobe View

Top: "My Wardrobe" title

Search bar below title (with search icon, placeholder "Search items...")

Filter chips row (horizontally scrollable): All, Tops, Bottoms, Dresses, Outerwear, Shoes, Bags, Accessories

Sort dropdown on the right: "Recently Added" / "A-Z" / "Category" / "Season"

Grid layout (2 columns) of item cards:

Square photo (slightly rounded corners)

Item name below photo

Brand name in secondary text

Small category tag pill

Show 12-16 placeholder items with realistic fashion item photos (use placeholder image URLs or colored rectangles with item names)

Floating "+" add button in bottom right (above tab bar)

3.2 Item Detail View

Large hero photo at top (full width, 60% of screen height)

Photo carousel dots if multiple photos

Below photo, a clean detail section:

Item name (heading): "Cream Cashmere Sweater"

Brand: "COS"

Category > Subcategory: "Tops > Knitwear"

Color dot + color name: "Cream"

Season tags: "Fall, Winter"

Occasion tags: "Casual, Work"

Purchase date: "Oct 2024"

Price: "$180"

Notes field: "Dry clean only. Runs slightly oversized."

QR Code Section:

Divider

Section title "Item Tag"

Show a generated QR code (can be a placeholder QR image)

Two buttons side by side:

"Download Tag" (outlined button)

"Order Printed Tag" (filled accent button)

Bottom action bar:

"Edit" button

"Add to Outfit" button

"Delete" text (in error color, small)

3.3 Tag Preview / Download Screen

Shows a preview of the printable tag card:

White card with item photo on top

QR code below

Item name and brand in small text

Dotted line indicating where to cut

"Save to Photos" button

"Print" button

"Order Professional Tags" link

4. ADD ITEM FLOW

4.1 Add Item - Photo Capture

Camera viewfinder UI (mock - show a dark rectangle with camera frame guides)

Bottom controls: Gallery picker (thumbnail), large capture button (circle), flash toggle

Top: close (X) button and "Add Item" title

After "capture" or gallery select, show the photo with:

"Retake" and "Use Photo" buttons

Option to add more photos (up to 5) shown as small thumbnails below

4.2 Add Item - Details Form

Show the selected photo(s) as small thumbnails at top

Smart Detection Banner (placeholder): "We detected: Jacket / Black / Outerwear" with "Apply" button (simulating AI auto-categorization - does not need to work, just show the UI)

Form fields:

Item Name (text input)

Category (dropdown: Tops, Bottoms, Dresses, Outerwear, Shoes, Bags, Accessories)

Subcategory (dynamic dropdown based on category selection)

Brand (text input with autocomplete suggestion UI)

Color (color picker - show a row of common color circles to tap, plus "Custom" option)

Season (multi-select chips: Spring, Summer, Fall, Winter, All Seasons)

Occasion (multi-select chips: Casual, Work, Formal, Evening, Sport, Travel)

Purchase Date (date picker)

Price (number input with currency)

Notes (text area)

"Save Item" button at bottom (full width, accent color)

4.3 Add Item - Confirmation

Success state: checkmark animation

"Item Added to Your Wardrobe"

Show the item card preview

QR code generated and displayed

Three CTAs:

"Download Tag Now"

"Order Printed Tag"

"Add Another Item"

"Go to Wardrobe" text link

5. OUTFIT BUILDER

5.1 Outfits Gallery

Title: "My Outfits"

Grid of saved outfit cards (2 columns)

Each card shows a collage of 2-4 item photos arranged together

Outfit name, occasion tag, and date created

Floating "+" button to create new outfit

5.2 Create Outfit

Title: "Create Outfit"

Top section: outfit preview area (empty canvas where selected items appear as a vertical arrangement - top, bottom, shoes, accessories in a flat-lay style layout)

Below: horizontal scrollable category tabs (Tops, Bottoms, Shoes, Accessories, etc.)

Grid of wardrobe items from selected category to pick from

Tapping an item adds it to the outfit preview above

Already-selected items show a checkmark overlay

Bottom bar:

Outfit name input

Occasion dropdown

"Save Outfit" button

5.3 Outfit Detail View

Full outfit display showing all items arranged

Outfit name and occasion

List of individual items below (tap to go to item detail)

"Edit Outfit" button

"Share" button (placeholder)

"Delete Outfit" text link

6. STYLIST MARKETPLACE

6.1 Stylist Browse

Title: "Find a Stylist"

Search bar

Filter chips: All, Wardrobe Organization, Personal Shopping, Event Styling, Seasonal Refresh

Stylist cards (full width, stacked):

Large profile photo (circular or rounded square)

Name: "Nour Hassan"

Specialty: "Wardrobe Organization & Personal Style"

Rating: 4.9 stars (48 reviews)

Price: "From $75 / session"

Short bio preview (2 lines): "Certified personal stylist with 8 years of experience helping clients..."

"View Profile" button

Show 4-5 placeholder stylist profiles

6.2 Stylist Profile

Cover/hero section with large photo

Name, verified badge, location

Bio section (full paragraph)

Stats row: "200+ clients" / "4.9 rating" / "3 years on closett"

Services offered:

Cards for each service with name, description, duration, price

Example: "Wardrobe Audit" - "Complete review of your wardrobe with keep/donate/style recommendations" - "2 hours" - "$150"

Example: "Outfit Planning" - "Weekly outfit plans based on your schedule and wardrobe" - "1 hour" - "$75"

Example: "Seasonal Refresh" - "Prepare your wardrobe for the new season with styling and shopping list" - "3 hours" - "$200"

Portfolio section:

Grid of styled outfit photos (placeholder images)

Reviews section:

3-4 review cards with name, rating, date, review text

"Book [Name]" sticky button at bottom

6.3 Booking Flow

Step 1: Select service (show service cards to pick from)

Step 2: Pick date and time (calendar UI with available time slots)

Step 3: Add notes ("Tell your stylist what you need help with" - text area)

Step 4: Review and confirm

Summary card: service, stylist, date/time, price

"Confirm Booking" button

Step 5: Confirmation screen

"Booking Confirmed!" with checkmark

Details summary

"Add to Calendar" button

"Message Stylist" button

"Back to Home" link

7. ORDER PRINTED TAGS

7.1 Order Tags - Select Items

Title: "Order Printed Tags"

Subtitle: "Select items you want professional tags for"

Grid of wardrobe items with checkboxes

Selected count at bottom: "4 items selected"

"Next" button

7.2 Order Tags - Shipping

Shipping address form:

Full name, phone, address line 1, address line 2, city, postal code, country

"Save as default address" toggle

"Review Order" button

7.3 Order Tags - Review & Pay

Order summary:

List of selected items (small thumbnails + names)

Quantity: 4 tags

Price per tag: $3.50

Subtotal: $14.00

Shipping: $5.00

Total: $19.00

Shipping address shown

Payment method placeholder (show a credit card input UI or "Pay on Delivery" option)

"Place Order" button

7.4 Order Confirmation

"Order Placed!" with checkmark

Order number: #CT-20240115

Estimated delivery: "3-5 business days"

"Track Order" button

"Continue Shopping" link

8. PROFILE & SETTINGS

8.1 Profile Screen

Profile photo (large, centered)

Name and email

Wardrobe Stats Card:

Total items, outfits created, tags ordered

Member since date

Menu Items (list):

My Orders (with order count badge)

Saved Stylists

Payment Methods

Shipping Addresses

Notifications

Help & Support

About closett

Sign Out

8.2 My Orders

List of orders with:

Order number, date, item count, total price

Status pill: "Preparing" / "Shipped" / "Delivered"

Tap for order detail

8.3 Notifications Settings

Toggle rows:

New stylist recommendations

Order updates

Style tips and trends

Outfit suggestions

Promotional offers

Navigation Structure

Bottom tab bar with 5 tabs:

Home (house icon) - Dashboard

Wardrobe (grid/closet icon) - Gallery view

Add (+ in circle, slightly elevated/larger) - Add item flow

Outfits (layers/stack icon) - Outfit builder and gallery

Profile (user icon) - Profile and settings

The stylist marketplace is accessible from:

Home screen quick action

A "Find Stylist" button in the wardrobe or outfits section

Profile menu could also link to "My Bookings"

Placeholder Data Requirements

Populate the app with realistic placeholder data:

12-16 wardrobe items across all categories with realistic names, brands, and details

3-4 saved outfits

5 stylist profiles with bios, services, and reviews

2 past orders in order history

Use placeholder image URLs or generate realistic colored card placeholders with item type labels

Technical Notes

Build in React with Tailwind CSS

Mobile-first (390px viewport width)

Use React Router for navigation between screens

Use local state management (useState/useContext) for the prototype

All data is hardcoded/mock - no backend needed

Smooth transitions between screens (fade or slide)

QR code: use a QR code generation library (like qrcode.react) to actually generate unique QR codes per item

Make the wardrobe grid filterable by category (client-side filter on the mock data)

Make the outfit builder actually allow selecting items and showing them in the preview

Make the add item form actually functional (saves to local state and appears in wardrobe)

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e86b3c4d-d7a8-45d5-b1c5-9ef406c9cc2c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
