import path from 'path';
import fs from 'fs';

export class PathResolver {
  /**
   * Resolves the backend root directory.
   * Handles both development (src) and production (dist) environments.
   */
  public static backendRoot(): string {
    // If we are in 'dist' or 'src/common/utils', we want to go up until we find package.json
    let currentDir = __dirname;
    while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
      const parentDir = path.resolve(currentDir, '..');
      if (parentDir === currentDir) {
        // Fallback if we reach filesystem root
        return path.resolve(__dirname, '../../..');
      }
      currentDir = parentDir;
    }
    return currentDir;
  }

  /**
   * Resolves the project root directory (the monorepo root).
   * Assuming the backend is in `backend/` and we want to go up one level.
   */
  public static projectRoot(): string {
    return path.resolve(this.backendRoot(), '..');
  }

  /**
   * Resolves the docs directory in the monorepo root.
   */
  public static docsRoot(): string {
    return path.join(this.projectRoot(), 'docs');
  }

  /**
   * Resolves the OpenAPI specification file.
   */
  public static apiDocs(): string {
    return path.join(this.docsRoot(), 'api', 'openapi.yaml');
  }
}
