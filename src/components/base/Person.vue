<template>
    <Transition name="fade">
        <div class="person-wrapper">
            <div class="person" refs="myDraggable">
                <div class="image" :style="{
                    'background': 'url(' + this.person.image + ')',
                    'border': '2.5px solid' + this.person.color
                }"></div>
                <Transition name="fade" mode="out-in">
                    <h4 v-if="isHovered" class="name" >{{ this.person.name }}</h4>
                </Transition>
            </div>
        </div>
    </Transition>
</template>

<script>

export default {
    props: {
        person: Object,
        isHovered: Boolean
    }
}
</script>

<style lang="scss">
    .person-wrapper {
        border: 0.5px solid rgba(0, 0, 0, 0.1);
        transition: all 250ms ease;
        border-radius: 18px;
        .person {
            /* Auto layout */
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 7px;
            gap: 12px;
            background: rgba(255, 255, 255, 0.92);
            border: 4px solid rgba(202, 202, 202, 0.2);
            border-radius: 18px;
            box-shadow: 0px 2.125px 4.25px rgba(0, 0, 0, 0.12), inset 0px 1px 1px rgba(0, 0, 0, 0.08);
            max-width: 12rem;
            justify-content: start;
            cursor: pointer;

            .image {
                /* Auto layout */
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                isolation: isolate;
                border-radius: 100%;

                width: 28px;
                height: 28px;

                background-size: cover !important;
            }
            .name {
                font-size: 15px;
                font-weight: 500;
                margin: 0;
                width: 8rem;
            }
        }
    }


</style>