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
          exec ${pkgs.nodejs_24}/bin/npx -y chrome-devtools-mcp --isolated -e ${pkgs.google-chrome}/bin/google-chrome-stable "$@"
        '';

        devShells.default = pkgs.mkShell ({
          buildInputs = with pkgs; [
            nodejs_24
            pnpm
            google-chrome
            rclone
          ];

          shellHook = ''
            export CHROME_PATH="${pkgs.google-chrome}/bin/google-chrome-stable"
          '';
        } // pkgs.lib.optionalAttrs pkgs.stdenv.hostPlatform.isLinux {
          LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath (with pkgs; [
            nspr
            nss
            atk
            cups
            libdrm
            gtk3
            pango
            cairo
            libx11
            libxcomposite
            libxdamage
            libxext
            libxfixes
            libxrandr
            libxcb
            mesa
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
        });
      }
    );
}
