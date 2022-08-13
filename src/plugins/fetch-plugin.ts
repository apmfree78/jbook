
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';


export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        }
        // Check to see if we already fetch this file 
        // and if it in the cache
        // const cachedResult = await localForage.getItem<esbuild.OnLoadResult>(args.path)
        // // if it is , return immediately
        // if (cachedResult) {
        //   return cachedResult;
        // }

        const { data, request } = await axios.get(args.path);

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'")
        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx'

        const contents = fileType === 'css' ?
          `const style = document.createElement('style');
           style.innerText = '${escaped}';
           document.head.appendChild(style);
           ` : data;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        // store response in cache
        await localForage.setItem(args.path, result);

        return result;
      });
    }
  }
}
