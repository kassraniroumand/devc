# NR-Dash-Front-Azure (Next.js Version)

This is a Next.js migration of the original Svelte-based web dashboard for visualizing and analyzing network rail data. It provides an interactive, client-side interface to explore metrics related to train services, station usage, and passenger demand.

## 🚀 Features

- **Interactive Data Visualization**: Dynamic charts using Chart.js and React Chart.js 2
- **Geospatial Data Representation**: Interactive maps with Maplibre GL
- **Scenario Planning**: Comprehensive scenario creation and management system
- **Modern UI Components**: Built with React and Tailwind CSS
- **State Management**: Efficient state management using Zustand
- **TypeScript**: Full TypeScript support for enhanced development experience
- **Responsive Design**: Mobile-first responsive design approach

## 🛠 Tech Stack

- **Next.js 15**: React framework with App Router
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS 4.0**: Utility-first CSS framework
- **Chart.js + React Chart.js 2**: Interactive data visualization
- **Maplibre GL**: Interactive mapping
- **Zustand**: Lightweight state management
- **AWS SDK**: Cloud services integration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ntap-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:
   ```env
   NEXT_PUBLIC_MAP_API_KEY=your_map_api_key
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── login/             # Authentication pages
│   ├── spatial/           # Main application page
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── charts/           # Chart components
│   ├── layout/           # Layout components
│   ├── map/              # Map components
│   └── ui/               # Base UI components
├── hooks/                # Custom React hooks
├── stores/               # Zustand state stores
├── types/                # TypeScript type definitions
└── lib/                  # Utility functions
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Key Components

#### State Management (Zustand)
- `app-store.ts` - Global application state
- `scenario-form-store.ts` - Scenario form state management
- `scenario-info-store.ts` - Scenario data management

#### Custom Hooks
- `use-fetch.ts` - Data fetching utilities
- `use-scenario-api.ts` - Scenario API operations
- `use-map-layer.ts` - Map layer management
- `use-panel-visibility.ts` - UI panel state management

#### UI Components
- Chart components with Chart.js integration
- Map components with Maplibre GL
- Form components with validation
- Layout and navigation components

## 🗺 Routes

- `/` - Root redirect to login
- `/login` - User authentication
- `/spatial` - Main application interface

## 🔌 API Endpoints

- `GET /api/models` - Fetch available models
- `POST /api/create-models/models2` - Create new scenario
- `GET /api/models-scenario` - Fetch scenarios

## 🎨 Styling

The project uses Tailwind CSS 4.0 with custom theme configuration:

- Primary color palette based on original design
- Responsive design utilities
- Custom component styles
- Dark mode support (optional)

## 📊 Data Flow

1. **Authentication**: User logs in through `/login`
2. **State Initialization**: Zustand stores are initialized
3. **Data Fetching**: Custom hooks fetch data from APIs
4. **UI Rendering**: Components render based on state
5. **User Interactions**: Actions update state through stores
6. **Real-time Updates**: WebSocket integration for live updates

## 🔒 Authentication

The application includes a basic authentication system:

- Login page with form validation
- Token-based authentication
- Protected routes
- User session management

For development, any username/password combination will work.

## 📈 Performance

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Built-in bundle analyzer
- **Caching**: Efficient data caching strategies

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t ntap-nextjs .
docker run -p 3000:3000 ntap-nextjs
```

### Manual Build
```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables

```env
# Map Configuration
NEXT_PUBLIC_MAP_API_KEY=your_map_api_key
NEXT_PUBLIC_MAP_STYLE_URL=your_map_style_url

# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=eu-west-2

# WebSocket Configuration
NEXT_PUBLIC_WS_URL=ws://localhost:3001/ws

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## 📚 Migration Notes

This Next.js version maintains feature parity with the original Svelte application:

### ✅ Migrated Features
- All UI components converted to React
- State management with Zustand
- Chart.js integration
- Maplibre GL integration
- API routes
- Authentication system
- Responsive design

### 🔄 Key Differences
- React hooks instead of Svelte stores
- Next.js App Router instead of SvelteKit routing
- Zustand instead of Svelte stores
- React Chart.js 2 instead of direct Chart.js integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information
4. Contact the development team

## 🏃‍♂️ Quick Start Guide

1. **First Time Setup**
   ```bash
   npm install
   npm run dev
   ```

2. **Login**
   - Navigate to `http://localhost:3000`
   - Use any username/password to login

3. **Explore Features**
   - Use the sidebar to navigate between tools
   - Create scenarios using the scenario builder
   - View results on interactive maps and charts

4. **Development**
   - Modify components in `src/components/`
   - Add new API routes in `src/app/api/`
   - Update state management in `src/stores/`

Enjoy building with the modernized Next.js version! 🎉
# devc
