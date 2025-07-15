'use client';

import React from 'react';
import { AppBar, Toolbar, Box, Button, Typography, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AccountCircle } from '@mui/icons-material';

export default function Header() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // No futuro, você pegaria o nome do usuário do token JWT ou de um estado global
  const userName = "Neto"; 

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Limpa o token do localStorage
    localStorage.removeItem('authToken');
    handleClose();
    // Redireciona para a página de login
    router.push('/');
  };

  return (
    // Deixando o AppBar com uma cor mais clara, usando o padrão do tema
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {/* Logo */}
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/conteudos" passHref>
            <Image
              src="/LogoInglesVerso.png"
              alt="InglêsVerso Logo"
              width={150}
              height={50}
              priority
            />
          </Link>
        </Box>

        {/* Menu do Usuário */}
        <div>
          <Button
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit" // A cor do texto do botão vai ser escura
            startIcon={<AccountCircle />}
          >
            <Typography variant="button">{userName}</Typography>
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled>Olá, {userName}!</MenuItem>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}