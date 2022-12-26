<template>
    <div class="person-wrapper">
        <div class="person">
            <div class="image"> <img :src="this.person.image"/> </div>
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
        border-radius: 25px;

        .person {
            /* Auto layout */
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 11px 20px 11px 9px;
            gap: 17px;
            background: rgba(255, 255, 255, 0.92);
            border: 7px solid rgba(202, 202, 202, 0.2);
            box-shadow: 0px 2.125px 4.25px rgba(0, 0, 0, 0.12), inset 0px 1px 1px rgba(0, 0, 0, 0.08);
            border-radius: 18px;
            min-width: 18rem;

            .image {
                /* Auto layout */
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                isolation: isolate;

                border: 2.5px solid #FF5A5A;
                border-radius: 100%;

                width: 36px;
                height: 36px;
            }
            .name {
                font-size: 22px;
                font-weight: 500;
                margin: 0;
            }
        }
    }


</style>