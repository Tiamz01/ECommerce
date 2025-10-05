# ECommerce

This project is a complete e-commerce application with cart and checkout functionality.

## Features

- Responsive design for all device sizes
- Product browsing and selection
- Shopping cart management
- Checkout with multiple payment options:
  - WhatsApp integration for order communication
  - Paystack integration for secure online payments

## Performance Optimizations

- Image lazy loading with blur placeholders
- Video lazy loading and optimized playback
- Code splitting and component lazy loading
- Bundle optimization with Vite
- Critical CSS inlining
- DNS prefetching and resource preloading
- Web Vitals monitoring

## Production Deployment

### Node.js Version

This project requires Node.js version 22.20.0. To ensure you're using the correct version:

```bash
# If you have nvm installed
nvm use

# Or manually set the version
nvm use 22.20.0
```

### Environment Variables

For production deployment, set the following environment variables:

```env
# Paystack configuration (for production)
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key

# WhatsApp Business Number (replace with your actual number)
WHATSAPP_BUSINESS_NUMBER=your_whatsapp_business_number
```

### Payment Integration

#### WhatsApp

The WhatsApp integration allows customers to send their order details directly to your business WhatsApp number. To configure:

1. Replace the placeholder WhatsApp number in `src/component/Checkout.jsx`
2. Ensure your business WhatsApp is set up to receive messages

#### Paystack

For Paystack integration:

1. Sign up at [Paystack](https://paystack.com)
2. Get your API keys from the dashboard
3. Set the environment variables as shown above
4. Implement the backend payment processing (see Backend Integration section)

### Backend Integration

For a complete production deployment, you'll need to implement backend services for:

1. Payment processing with Paystack
2. Order management
3. Inventory management
4. Customer data storage

### Deployment Platforms

This application can be deployed to:

- Vercel
- Netlify
- AWS
- Heroku
- Any Node.js hosting provider

## Development

To run the application locally:

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

To optimize images (placeholder script):

```bash
node optimize-images.js
```

## Project Structure

```
src/
  ├── app/              # Redux store and slices
  ├── assets/           # Images and static assets
  ├── component/        # React components
  ├── data/             # Static data
  ├── utils/            # Utility functions
  └── main.jsx          # Entry point
```

## Technologies Used

- React
- Redux Toolkit
- Tailwind CSS
- Paystack SDK
- Heroicons
- Vite (build tool)
- react-lazy-load-image-component
- web-vitals