<template>
    <div class="top-header">
        <img class="icon" alt="Beer logo" src="../assets/beers-icon.png">
        <div>PUB'S TABS</div>
    </div>
</template>

<script>
export default {
    name: "TopHeader"
}
</script>

<style>
.top-header {
    background-color: #343434;
    overflow: hidden;
    color: white;
    float: left;
    width: 100%;
    display: flex;
    box-shadow: 0px 10px 10px 10px rgb(0, 0, 0, 0.78);
    margin-bottom: 32px;
}
.top-header div {
    padding-top: 32px;
    font-stretch: extra-condensed;
    font-weight: bolder;
    color: white;
    font-size: 36px;
}
.icon {
    width: 78px;
    height: 78px;
    padding: 16px;
}
</style>