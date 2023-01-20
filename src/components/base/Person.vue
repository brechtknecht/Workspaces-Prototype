<template>
    <div class="person-wrapper">
        <div class="person">
            <div class="image" :style="{'background': 'url(' + this.person.image + ')'}"></div>
            <h4  class="name">{{ this.person.name }}</h4>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        person: Object
    }
}
</script>

<style lang="scss">
    .person-wrapper {
        border: 0.5px solid rgba(0, 0, 0, 0.1);
        border-radius: 12px;

        .person {
            /* Auto layout */
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 7px 12px 7px 5px;
            gap: 12px;
            background: rgba(255, 255, 255, 0.92);
            border: 4px solid rgba(202, 202, 202, 0.2);
            border-radius: 18px;
            box-shadow: 0px 2.125px 4.25px rgba(0, 0, 0, 0.12), inset 0px 1px 1px rgba(0, 0, 0, 0.08);
            min-width: 12rem;

            cursor: pointer;

            .image {
                /* Auto layout */
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                isolation: isolate;

                border: 2.5px solid #FF5A5A;
                border-radius: 100%;

                width: 28px;
                height: 28px;

                background-size: cover !important;
            }
            .name {
                font-size: 17px;
                font-weight: 500;
                margin: 0;
            }
        }
    }


</style>