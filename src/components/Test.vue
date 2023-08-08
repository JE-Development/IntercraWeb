<template>
    <div>
        <VueScriptComponent :script="adScript"/>
    </div>
</template>
<script>
import VueScriptComponent from 'vue-script-component'
export default {
    components: {
        VueScriptComponent
    },
    data() {
        return {
            adScript: `
<script type="text/javascript">
atOptions = {
'key': 'a07474aa74bd2f07f728638a5395d920',
'format': 'iframe',
'height': 600,
'width': 160,
'params': {}
};
document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://caresspincers.com/a07474aa74bd2f07f728638a5395d920/invoke.js">');
</scr`+`ipt>`
};
}
};
</script>