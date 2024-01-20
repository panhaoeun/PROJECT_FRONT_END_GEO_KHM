import {
    computed
} from "vue";

export default function useSubmittedButtonState(orgDept) {
    const isSubmitButtonDisabled = computed(() => {
        let disabled = true;
        for (let prop in orgDept) {
            if (!orgDept[prop]) {
                disabled = true;
                break;
            }
            disabled = false;
        }
        return disabled;
    });
    return {
        isSubmitButtonDisabled
    }
}