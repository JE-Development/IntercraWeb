
<template>
    <div v-if="isResult">
        <div v-if="savedContent">
            <div class="saved-content-div center-horizontal">
                <a @click="handleClick"><img class="saved-content-icon image-arrow-left"/></a>
            </div>
        </div>
        <div v-else class="saved-content-right">
            <div class="saved-content-div center-horizontal">
                <a @click="handleClick"><img class="saved-content-icon image-arrow-right"/></a>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: "SavedIconView",


    props: {
        isResult: Boolean,
        savedContent: Boolean,
        onClick: {
            type: Function,
        },
    },

    methods: {
        handleClick() {
            this.onClick();
        },
    },

}

</script>


<style scoped>

</style>