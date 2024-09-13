## Express.js + Prisma + Google Oauth Boilerplate

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) for package management

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hamgeek/expressjs-prisma-boilerplate.git
   cd expressjs-prisma-boilerplate
   ```

2. **Install dependencies using `pnpm`:**

   ```bash
   pnpm install
   ```

3. **Configure environment variables:**

   Copy `.env.example` to `.env` and adjust according to your configuration:

   ```bash
   cp .env.example .env
   ```

### Usage

1. **Run the server on development:**

   ```bash
   npm run dev
   ```

2. **Access the application in your browser:**

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Husky Setup

This project uses `Husky` to manage Git hooks. By default, it is set up to run linting and tests before commits.

- **Pre-commit hook**: Runs linting and tests before allowing a commit.

You can customize these hooks by modifying the `husky` configuration in `package.json` or by editing files in the `.husky/` directory.

### Build

1. **Build project:**

   run:

   ```bash
   pnpm build
   ```

   This will compile the project into the `dist` directory.

Author : [@hamgeek](https://github.com/hamgeek)
