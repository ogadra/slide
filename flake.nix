{
  description = "ogadra's slides website development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      in
      {
        packages.chrome-devtools-mcp = pkgs.writeShellScriptBin "chrome-devtools-mcp" ''
          exec ${pkgs.pnpm}/bin/pnpm dlx chrome-devtools-mcp@latest -e ${pkgs.google-chrome}/bin/google-chrome-stable "$@"
        '';

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_24
            corepack
            google-chrome
          ];

          # Playwright requires these libraries
          LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath (with pkgs; [
            nspr
            nss
            atk
            cups
            libdrm
            gtk3
            pango
            cairo
            xorg.libX11
            xorg.libXcomposite
            xorg.libXdamage
            xorg.libXext
            xorg.libXfixes
            xorg.libXrandr
            xorg.libxcb
            mesa
            mesa.drivers
            libgbm
            libGL
            expat
            alsa-lib
            at-spi2-atk
            at-spi2-core
            glib
            dbus
            libxkbcommon
            systemd
          ]);

          shellHook = ''
            echo "Slide development environment loaded"
            echo "Node.js: $(node --version)"
            echo "npm: $(npm --version)"
            export CHROME_PATH="${pkgs.google-chrome}/bin/google-chrome-stable"
          '';
        };
      }
    );
}
