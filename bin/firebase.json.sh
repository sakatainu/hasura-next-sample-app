#!/bin/sh
file='./firebase.json'
consoleManifest='./packages/console/.next/buildDir/routes-manifest.json'
partnerManifest='./packages/partner/.next/buildDir/routes-manifest.json'
process='{rewrites:[(.dynamicRoutes|.[]|{destination:(.page+".html"),regex:.regex})]}'

tmpfile=$(mktemp)
jq ".hosting[0] |= .* $(jq $process $consoleManifest)" $file > $tmpfile && mv $tmpfile $file
jq ".hosting[1] |= .* $(jq $process $partnerManifest)" $file > $tmpfile && mv $tmpfile $file
rm -f $tmpfile
