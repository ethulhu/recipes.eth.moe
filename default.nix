{ pkgs ? import <nixpkgs> {} }:
with pkgs;

stdenv.mkDerivation rec {
  name = "recipesEthMoe-${version}";
  version = "latest"; 

  src = ./.;

  buildInputs = [
    python38
    python38Packages.jinja2
    python38Packages.pyaml
  ];

  phases = "installPhase";

  installPhase = ''
    mkdir -p $out
    cp -r ${src}/build/* $out
  '';

}
