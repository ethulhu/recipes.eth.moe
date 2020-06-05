# SPDX-FileCopyrightText: 2020 Ethel Morgan
#
# SPDX-License-Identifier: MIT

{ pkgs ? import <nixpkgs> {} }:

with pkgs; mkShell {
  buildInputs = [
    gnumake
    python38
    python38Packages.jinja2
    python38Packages.pyaml
  ];
}
