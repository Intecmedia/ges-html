import { ITransitionData } from '@barba/core/dist/core/src/defs';
import Component from '@/base/component';
import SectionHero from '@/components/sections/section-hero/section-hero';
import SectionMain from '@/components/sections/section-main/section-main';
import SectionAbout from '@/components/sections/section-about/section-about';
import SectionStatus from '@/components/sections/section-status/section-status';
import BlockHeroSlider from '@/components/blocks/block-hero-slider/block-hero-slider';
import BlockHeading from '@/components/blocks/block-heading/block-heading';
import BlockProjects from '@/components/blocks/block-projects/block-projects';
import BlockMedia from '@/components/blocks/block-media/block-media';
import BlockStatistic from '@/components/blocks/block-statistic/block-statistic';
import BlockHero from '@/components/blocks/block-hero/block-hero';
import BlockSolution from '@/components/blocks/block-solution/block-solution';
import BlockRelation from '@/components/blocks/block-relation/block-relation';
import CardProjects from '@/components/blocks/card-projects/card-projects';
import CardMedia from '@/components/blocks/card-media/card-media';
import CardStatistic from '@/components/blocks/card-statistic/card-statistic';
import CardDocuments from '@/components/blocks/card-documents/card-documents';
import RowSolution from '@/components/blocks/row-solution/row-solution';
import SlideHero from '@/components/blocks/slide-hero/slide-hero';
import TitleMain from '@/components/ui/title-main/title-main';
import ButtonMain from '@/components/ui/button-main/button-main';
import TextIndent from '@/components/ui/text-indent/text-indent';
import TextLabel from '@/components/ui/text-label/text-label';

// Набор всех компонентов, для которых будет применяться стандартная инициализация
const allComponents: Record<string, any & Component<HTMLElement>> = {
    'section-hero': SectionHero,
    'section-main': SectionMain,
    'section-about': SectionAbout,
    'section-status': SectionStatus,
    'block-hero-slider': BlockHeroSlider,
    'block-heading': BlockHeading,
    'block-projects': BlockProjects,
    'block-media': BlockMedia,
    'block-statistic': BlockStatistic,
    'block-hero': BlockHero,
    'block-solution': BlockSolution,
    'block-relation': BlockRelation,
    'card-projects': CardProjects,
    'card-media': CardMedia,
    'card-statistic': CardStatistic,
    'card-documents': CardDocuments,
    'row-solution': RowSolution,
    'slide-hero': SlideHero,
    'title-main': TitleMain,
    'button-main': ButtonMain,
    'text-indent': TextIndent,
    'text-label': TextLabel
};

export default {
    namespace: 'common',
    components: <Component<HTMLElement>[]>[],
    async beforeEnter({ next: { container, url } }: ITransitionData) {
        try {
            // Стандартная инициализация компонентов
            const existedComponents = Array.from(container.querySelectorAll<HTMLElement>('[data-component]'));

            this.components = existedComponents.map((component) => {
                try {
                    return new allComponents[component.dataset.component!]({
                        name: component.dataset.component,
                        component: component,
                    });
                } catch (e: any) {
                    console.error(`Ошибка во время инициализации компонента: ${component.dataset.component}\n\n${e}`);
                }
            });

            // Дополнительная логика для инициализации страницы
            // ...

        } catch (e) {
            console.error(e);
        }
    },
    beforeLeave() {
        this.components.forEach((component) => {
            try {
                component.destroy()
            } catch (e: any) {
                console.error(`Ошибка во время удаления компонента: ${component.nRootName}\n\n${e}`);
            }
        })
        this.components = [];
    },

    afterLeave() {
    },
};
