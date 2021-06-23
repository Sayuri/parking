import React, { FC } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

type ButtonProps =
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  text: string
}

export const Button: FC<ButtonProps> = props =>
  <button
    {...props}
    className={`w-full h-16 text-xl font-bold text-center bg-cgreen-dark rounded-lg ${props.className}`}>
    {props.text}
  </button>


type NavButtonProps = NavLinkProps & {
  text: string
}

export const NavButton: FC<NavButtonProps> = props =>
  <NavLink {...props}>
    {props.text}
  </NavLink>
