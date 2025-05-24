import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Box, Toolbar, Typography, Paper, Fade } from '@mui/material';
import { 
  Movie as MovieIcon, 
  People as PeopleIcon, 
  Work as WorkIcon,
  Home as HomeIcon,
  Theaters as TheatersIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import Peliculas from "../src/Pages/Peliculas.jsx";
import List from "../src/Pages/List.jsx";
import Clientes from "../src/Pages/Clientes.jsx";
import ListClientes from "../src/Pages/ListClientes.jsx";
import Empleados from "../src/Pages/Empleados.jsx";
import ListEmpleado from "../src/Pages/ListEmpleado.jsx";


const styles = `
  /* Variables CSS */
  :root {
    --primary-red: #d32f2f;
    --primary-red-hover: #b71c1c;
    --accent-gold: #ffd700;
    --accent-gold-dim: rgba(255, 215, 0, 0.3);
    --bg-dark: #0a0a0a;
    --bg-card: rgba(25, 25, 25, 0.95);
    --bg-card-light: rgba(30, 30, 30, 0.95);
    --bg-overlay: rgba(0, 0, 0, 0.8);
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
    --text-muted: #999999;
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
    --spacing-xxl: 4rem;
    --border-radius: 12px;
    --border-radius-lg: 16px;
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.4);
    --shadow-gold: 0 0 20px var(--accent-gold-dim);
    --transition-fast: 0.2s ease-in-out;
    --transition-normal: 0.3s ease-in-out;
    --transition-slow: 0.5s ease-in-out;
  }

  /* Reset global */
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-primary);
    line-height: 1.6;
    margin: 0;
    overflow-x: hidden;
  }

  /* Contenedor principal */
  .cine-app-root {
    min-height: 100vh;
    background: 
      linear-gradient(135deg, var(--bg-overlay), rgba(0, 0, 0, 0.9)),
      radial-gradient(circle at center, rgba(211, 47, 47, 0.1) 0%, transparent 70%);
    position: relative;
  }

  .cine-app-root::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at center, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%);
    z-index: -1;
    pointer-events: none;
  }

  /* Header principal */
  .app-header {
    text-align: center;
    padding: var(--spacing-xl) var(--spacing-lg);
    position: relative;
  }

  .app-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 900;
    background: linear-gradient(45deg, var(--accent-gold), #ffed4e, var(--accent-gold));
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: goldShimmer 3s ease-in-out infinite;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    letter-spacing: 2px;
    margin-bottom: var(--spacing-sm);
  }

  @keyframes goldShimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .app-subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    font-weight: 300;
    opacity: 0.9;
  }

  /* Tarjetas principales */
  .cine-card {
    background: var(--bg-card);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow-md);
    position: relative;
    overflow: hidden;
    transition: all var(--transition-normal);
    margin-bottom: var(--spacing-lg);
  }

  .cine-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
    transition: left var(--transition-slow);
  }

  .cine-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-gold);
    border-color: rgba(255, 215, 0, 0.3);
  }

  .cine-card:hover::before {
    left: 100%;
  }

  /* Sidebar personalizada */
  .cine-sidebar {
    background: var(--bg-card) !important;
    border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(10px);
  }

  .cine-sidebar .MuiListItemButton-root {
    margin: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius);
    transition: all var(--transition-normal);
    color: var(--text-secondary);
  }

  .cine-sidebar .MuiListItemButton-root:hover {
    background: rgba(255, 215, 0, 0.1);
    color: var(--accent-gold);
    transform: translateX(5px);
  }

  .cine-sidebar .MuiListItemButton-root.active {
    background: linear-gradient(45deg, var(--primary-red), rgba(211, 47, 47, 0.8));
    color: var(--text-primary);
    box-shadow: var(--shadow-sm);
  }

  /* Contenido principal */
  .main-content {
    background: transparent;
    min-height: calc(100vh - 64px);
    padding: var(--spacing-lg);
  }

  /* Botones personalizados */
  .cine-button {
    background: linear-gradient(45deg, var(--primary-red), #ff5252) !important;
    color: var(--text-primary) !important;
    border: none !important;
    border-radius: var(--border-radius) !important;
    padding: var(--spacing-md) var(--spacing-xl) !important;
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    text-transform: none !important;
    transition: all var(--transition-normal) !important;
    position: relative;
    overflow: hidden;
    letter-spacing: 0.5px;
  }

  .cine-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left var(--transition-normal);
  }

  .cine-button:hover {
    background: linear-gradient(45deg, var(--primary-red-hover), #d32f2f) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(211, 47, 47, 0.4);
  }

  .cine-button:hover::before {
    left: 100%;
  }

  /* Campos de entrada */
  .cine-input .MuiOutlinedInput-root {
    background-color: rgba(20, 20, 20, 0.9);
    color: var(--text-primary);
    border-radius: var(--border-radius);
    transition: all var(--transition-normal);
  }

  .cine-input .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 215, 0, 0.5);
  }

  .cine-input .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: var(--accent-gold);
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
  }

  .cine-input .MuiInputLabel-root {
    color: var(--text-secondary);
  }

  .cine-input .MuiInputLabel-root.Mui-focused {
    color: var(--accent-gold);
  }

  /* Estados de carga */
  .loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    background: var(--bg-card);
    border-radius: var(--border-radius-lg);
    margin: var(--spacing-lg) 0;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .app-title {
      font-size: 2.5rem;
    }
    
    .cine-card {
      padding: var(--spacing-lg);
      margin-bottom: var(--spacing-md);
    }
    
    .main-content {
      padding: var(--spacing-md);
    }
  }

  /* Scrollbar personalizada */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, var(--primary-red), var(--accent-gold));
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, var(--primary-red-hover), #ffed4e);
  }

  /* Animaciones */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeInUp 0.6s ease-out;
  }

  /* Efectos de hover para las tarjetas de película */
  .movie-card {
    background: var(--bg-card-light);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
    transition: all var(--transition-normal);
    position: relative;
    overflow: hidden;
  }

  .movie-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-red), var(--accent-gold), var(--primary-red));
    transform: translateX(-100%);
    transition: transform var(--transition-slow);
  }

  .movie-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--shadow-gold);
    border-color: rgba(255, 215, 0, 0.4);
  }

  .movie-card:hover::before {
    transform: translateX(0);
  }
`;

// Componente de carga mejorado
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="loading-container">
      <TheatersIcon 
        sx={{ 
          fontSize: 60, 
          color: '#ffd700', 
          mb: 2,
          animation: 'pulse 1.5s infinite',
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
            '50%': { transform: 'scale(1.1)', opacity: 1 }
          }
        }} 
      />
      
      <Typography 
        variant="h5" 
        sx={{ 
          color: '#ffd700', 
          fontWeight: 'bold',
          mb: 2,
          textAlign: 'center'
        }}
      >
        CineApp
      </Typography>
      
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#ccc', 
          mb: 3,
          textAlign: 'center'
        }}
      >
        Cargando contenido...
      </Typography>
      
      <Box sx={{ width: '100%', maxWidth: 300 }}>
        <Box
          sx={{
            width: '100%',
            height: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #d32f2f, #ffd700)',
              transition: 'width 0.3s ease',
              borderRadius: 2
            }}
          />
        </Box>
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#999', 
            display: 'block', 
            textAlign: 'center', 
            mt: 1 
          }}
        >
          {Math.round(progress)}%
        </Typography>
      </Box>
    </div>
  );
};

// Sidebar mejorada con el tema cinematográfico
const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { path: '/', icon: <HomeIcon />, label: 'Inicio' },
    { path: '/peliculas', icon: <MovieIcon />, label: 'Películas' },
    { path: '/clientes', icon: <PeopleIcon />, label: 'Clientes' },
    { path: '/empleados', icon: <WorkIcon />, label: 'Empleados' }
  ];

  return (
    <Paper 
      className="cine-sidebar"
      sx={{ 
        width: isOpen ? 280 : 70,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1200,
        transition: 'width 0.3s ease',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TheatersIcon sx={{ color: '#ffd700', fontSize: 32 }} />
          {isOpen && (
            <Typography variant="h6" sx={{ color: '#ffd700', fontWeight: 'bold' }}>
              Cine Mark
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <Box
            key={item.path}
            component="a"
            href={item.path}
            className={`MuiListItemButton-root ${location.pathname === item.path ? 'active' : ''}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 1.5,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            {item.icon}
            {isOpen && (
              <Typography variant="body1">
                {item.label}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon sx={{ color: '#ccc', '&:hover': { color: '#ffd700' } }} />
      </Box>
    </Paper>
  );
};

// Página de inicio mejorada
const HomePage = () => (
  <div className="fade-in">
    <div className="app-header">
      <h1 className="app-title">Cine Mark</h1>
      <p className="app-subtitle">Sistema de Gestión Cinematográfica</p>
    </div>
    
    <div className="cine-card">
      <Typography variant="h4" sx={{ color: '#ffd700', mb: 3, textAlign: 'center' }}>
        Bienvenido a CineApp
      </Typography>
      
      <Typography variant="body1" sx={{ color: '#ccc', textAlign: 'center', mb: 4, lineHeight: 1.8 }}>
        Tu sistema completo para la gestión de películas, clientes y empleados. 
        Navega por las diferentes secciones usando el menú lateral para comenzar.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3, mt: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center', background: 'rgba(211, 47, 47, 0.1)', borderRadius: 2 }}>
          <MovieIcon sx={{ fontSize: 48, color: '#ffd700', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>Películas</Typography>
          <Typography variant="body2" sx={{ color: '#ccc' }}>
            Gestiona tu catálogo de películas
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center', background: 'rgba(255, 215, 0, 0.1)', borderRadius: 2 }}>
          <PeopleIcon sx={{ fontSize: 48, color: '#ffd700', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>Clientes</Typography>
          <Typography variant="body2" sx={{ color: '#ccc' }}>
            Administra tu base de clientes
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center', background: 'rgba(211, 47, 47, 0.1)', borderRadius: 2 }}>
          <WorkIcon sx={{ fontSize: 48, color: '#ffd700', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>Empleados</Typography>
          <Typography variant="body2" sx={{ color: '#ccc' }}>
            Controla tu equipo de trabajo
          </Typography>
        </Paper>
      </Box>
    </div>
  </div>
);

// Componente principal de contenido
const Content = ({ moviesUpdated, refreshMovies }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="fade-in">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/peliculas" 
          element={
           <>
           <Peliculas refreshMovies={refreshMovies} />
           <List moviesUpdated={moviesUpdated}/>
           </>
          } 
        />
        <Route 
          path="/clientes" 
          element={
            <>
           <Clientes refreshMovies={refreshMovies} />
           <ListClientes moviesUpdated={moviesUpdated}/>
            </>
          } 
        />
        <Route 
          path="/empleados" 
          element={
         <>
         <Empleados refreshMovies={refreshMovies} />
         <ListEmpleado moviesUpdated={moviesUpdated} />
         </>
          } 
        />
      </Routes>
    </div>
  );
};

// Componente principal de la aplicación
const App = () => {
  const [moviesUpdated, setMoviesUpdated] = useState(false);

  const refreshMovies = () => {
    setMoviesUpdated(!moviesUpdated);
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="cine-app-root">
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box 
            component="main" 
            className="main-content"
            sx={{ 
              flexGrow: 1, 
              ml: { xs: '70px', md: '280px' },
              transition: 'margin-left 0.3s ease'
            }}
          >
            <Content moviesUpdated={moviesUpdated} refreshMovies={refreshMovies} />
          </Box>
        </Box>
      </Router>
    </div>
  );
};

export default App;