let esbuild = require('esbuild')

module.exports = async function build (arc, cfn, stage) {

  // bundle/transpile entry files
  await esbuild.build({
    entryPoints: [
      'src/http/get-index/index.tsx',
      'src/http/post-count/index.tsx',
    ],
    bundle: true,
    platform: 'node',
    outdir: '.architect/src',
    outbase: 'src',
    logLevel: 'error'
  })

  // rewrite all code paths to new build dir
  for (let name of Object.keys(cfn.Resources)) {
    let resource = cfn.Resources[name]
    if (resource.Type === 'AWS::Serverless::Function') {
      let src = resource.Properties.CodeUri
      resource.Properties.CodeUri = src.replace('./src', './.architect/src')
    }
  }

  return cfn
}
