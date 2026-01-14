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
