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

  const userName = "User"; 

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
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {/* Logo */}
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/Conteudos" passHref>
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
            color="inherit"
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