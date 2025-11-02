# 🖨️ Automatic Order Printing Setup Guide

## Overview
This system automatically detects new orders and prints them on your receipt printer, just like your current workflow!

## 🎯 How It Works

1. **Customer places order** on the website
2. **Order automatically appears** on Print Station page
3. **Browser triggers print** automatically
4. **Receipt prints** on your thermal printer
5. **Kitchen receives** the printed order ticket

## 📋 Setup Instructions

### Step 1: Connect Your Printer
Your existing receipt printer will work! Most thermal printers are compatible.

**Common printer types that work:**
- Epson TM-T20 / TM-T88
- Star TSP100 / TSP650
- Bixolon SRP-350
- Any USB or network thermal printer

### Step 2: Set Up the Print Station

#### Option A: Dedicated Device (Recommended)
1. Use an old tablet, laptop, or computer near the kitchen
2. Connect the printer via USB or network
3. Open Chrome or Edge browser
4. Go to: `https://bitsandpizzas.vercel.app/admin/print`
5. Bookmark this page
6. **Keep this tab open** - it runs 24/7

#### Option B: Use Your Current Computer
1. Open the print station page in a browser tab
2. Pin the tab so it doesn't close
3. Minimize the window - it works in the background

### Step 3: Configure Browser for Auto-Print

#### Chrome Setup:
1. Click the **⋮** (three dots) → Settings
2. Search for "**printing**"
3. Under "**Printers**", select your receipt printer as **default**
4. Turn ON "**Print silently**" (allows auto-print without dialog)
5. Go to `chrome://flags/` in address bar
6. Search for "**insecure**" 
7. Enable "**Insecure origins treated as secure**"
8. Add your site URL

#### Edge Setup:
1. Click **...** → Settings → Printers
2. Select your receipt printer as default
3. Similar steps to Chrome above

### Step 4: Test the System

1. **Place a test order** from the main website
2. **Watch the Print Station** - it will detect the order within 3 seconds
3. **Print dialog appears** (or prints automatically if silent print is enabled)
4. **Receipt prints** on your thermal printer
5. **Give to kitchen** as usual!

## 📄 Receipt Format

The printed receipt includes:
```
================================
       BITS & PIZZAS
     408 S Main Street
    Snowflake, AZ 85937
    Phone: (928) 536-4005
================================

ORDER #ORD-1234567890
Date: 11/02/2025 2:30 PM
Type: PICKUP

================================

CUSTOMER:
John Doe
(555) 123-4567
Payment: CASH

================================

ITEMS:
1x  Large Pepperoni Pizza  $15.99
2x  Hot Wings - BBQ        $16.80
1x  Medium Coke            $1.69

================================

TOTAL:                    $34.48

================================

SPECIAL INSTRUCTIONS:
Extra cheese on pizza
Light sauce

================================

   Thank you for your order!
   Estimated time: 20-45 minutes
```

## 🔧 Troubleshooting

### Prints aren't automatic?
- Enable "silent printing" in browser settings
- Make sure printer is set as default
- Check printer is turned on and has paper

### Print Station not detecting orders?
- Refresh the page
- Check internet connection
- Make sure you're logged into the same browser/device

### Receipt looks weird?
- Use **Chrome** or **Edge** (best compatibility)
- Printer should be set to 3-inch (80mm) thermal paper
- Check printer settings for margins

### Multiple receipts printing?
- This happens if Print Station is open in multiple tabs/devices
- **Solution**: Only keep ONE Print Station tab open

## 💡 Pro Tips

### 1. Use a Cheap Android Tablet
- Get a $50 Android tablet
- Connect to WiFi
- Open Print Station page in Chrome
- Keep plugged in and screen on
- Perfect dedicated print station!

### 2. Sound Notifications
The Print Station page shows visual alerts for new orders. For sound:
- Turn up device volume
- Print dialog makes a sound
- Or use browser extensions for custom alerts

### 3. Auto-Reload on Errors
If the page crashes (rare), use a browser extension:
- "Tab Reloader" for Chrome
- Set to reload every hour as backup

### 4. Network Printers
If using a network/WiFi printer:
- Connect printer to same WiFi as device
- Add printer in system settings
- Works the same as USB!

## 🎮 Alternative: Manual Print Mode

If auto-print doesn't work, you can manually print:

1. Go to `/admin` (main dashboard)
2. See all new orders
3. **Right-click order** → Print
4. Or use **Ctrl+P** (Windows) / **Cmd+P** (Mac)

## 📱 Mobile Setup (Bluetooth Printer)

If you have a Bluetooth receipt printer:

1. Open Print Station on a smartphone/tablet
2. Pair Bluetooth printer in device settings
3. Select as default printer
4. Works the same way!

## 🔒 Security Note

The Print Station page:
- Only shows orders from localStorage (local to this browser)
- No login required (it's already on your internal device)
- Safe to leave open in your restaurant
- Not accessible from outside

## 🆘 Support

**Having issues?**
- Most problems are browser/printer settings
- Try a different browser (Chrome recommended)
- Restart the printer
- Call tech support: (928) 536-4005

## 📊 Future Upgrades

Coming soon:
- SMS notifications when order prints
- Kitchen display system (no paper needed!)
- Order status updates from kitchen
- Integration with POS systems

---

**Quick Start:**
1. Open `https://bitsandpizzas.vercel.app/admin/print`
2. Keep tab open
3. Orders print automatically! 🎉
