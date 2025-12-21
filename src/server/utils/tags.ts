import { Category, TagData, categoryMapping } from '../../constants/categories';

const breakingTagId: Category = 'breaking';
const domesticTagId: Category = 'domestic';
const worldTagId: Category = 'world';
const topTagId: Category = 'top';
const lastTagId: Category = 'other';

const tagsToFilterOut = new Set<Category>([
    breakingTagId,
    topTagId,
    domesticTagId,
    worldTagId,
    lastTagId,
]);

export const getTagsToDisplay = (activeTagId?: Category): Array<TagData> => {
    const allTags: Array<TagData> = Object.entries(categoryMapping)
        .filter(([key, _value]) => !tagsToFilterOut.has(key as Category))
        .filter(([key, _value]) => key !== activeTagId)
        .map(([key, value]) => ({
            id: key as Category,
            name: value,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

    const firstTags: Array<TagData> = [];
    if (activeTagId !== topTagId) {
        firstTags.push({
            id: topTagId,
            name: categoryMapping[topTagId],
        });
    }
    if (activeTagId !== domesticTagId) {
        firstTags.push({
            id: domesticTagId,
            name: categoryMapping[domesticTagId],
        });
    }
    if (activeTagId !== worldTagId) {
        firstTags.push({
            id: worldTagId,
            name: categoryMapping[worldTagId],
        });
    }
    const lastTags: Array<TagData> = [];
    if (activeTagId !== lastTagId) {
        lastTags.push({
            id: lastTagId,
            name: categoryMapping[lastTagId],
        });
    }

    return [
        ...(activeTagId
            ? [
                  {
                      id: activeTagId,
                      name: categoryMapping[activeTagId],
                  },
              ]
            : []),
        ...firstTags,
        ...allTags,
        ...lastTags,
    ];
};
