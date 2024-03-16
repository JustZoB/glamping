<template>
    <component :is="componentIcon" />
</template>

<script setup lang="ts">
import { onMounted, ref, markRaw, type FunctionalComponent, type HTMLAttributes, type Raw, type VNodeProps } from 'vue';
import {
    UserIcon,
    SpeakerWaveIcon,
    DocumentIcon,
    EnvelopeIcon,
    ShareIcon,
    GlobeAltIcon,
    ChartBarIcon,
    WifiIcon,
    BoltIcon,
    UserPlusIcon,
    InformationCircleIcon,
} from '@heroicons/vue/24/solid';

const props = defineProps<{
    icon: string;
}>();

const componentIcon = ref<Raw<FunctionalComponent<HTMLAttributes & VNodeProps, {}>> | null>(null);
const lookup = {
    UserIcon,
    SpeakerWaveIcon,
    DocumentIcon,
    EnvelopeIcon,
    ShareIcon,
    GlobeAltIcon,
    ChartBarIcon,
    WifiIcon,
    BoltIcon,
    UserPlusIcon,
    InformationCircleIcon,
};
type EmitHeroIcons =
    | 'UserIcon'
    | 'SpeakerWaveIcon'
    | 'DocumentIcon'
    | 'EnvelopeIcon'
    | 'ShareIcon'
    | 'GlobeAltIcon'
    | 'ChartBarIcon'
    | 'WifiIcon'
    | 'BoltIcon'
    | 'UserPlusIcon'
    | 'InformationCircleIcon';

onMounted(() => {
    setIcon(props.icon as EmitHeroIcons);
});

function setIcon(compName: EmitHeroIcons) {
    componentIcon.value = compName && lookup[compName] ? markRaw(lookup[compName]) : markRaw(lookup['UserIcon']);
}
</script>
