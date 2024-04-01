<template>
    <div class="absolute bottom-0 left-0 w-full p-4" id="room-footer">
        <div class="sm:flex w-full space-x-3 rtl:space-x-reverse items-center">
            <div class="relative flex-1">
                <input
                    class="form-input rounded-full border-0 bg-[#f4f4f4] px-12 focus:outline-none py-2"
                    placeholder="Type a message"
                    v-model="textMessage"
                    @keyup.enter.exact="sendMessage()"
                />
                <button
                    type="button"
                    class="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 hover:text-primary"
                >
                    <room-emojis
                        :filtered-emojis="filteredEmojis"
                        :select-item="selectEmojiItem"
                        :active-up-or-down="activeUpOrDownEmojis"
                        @select-emoji="selectEmoji($event)"
                        @activate-item="activeUpOrDownEmojis = 0"
                    />
                    <!-- <icon-mood-smile /> -->
                </button>
                <button
                    type="button"
                    class="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 hover:text-primary"
                    @click="sendMessage()"
                >
                    <icon-send />
                </button>
            </div>
            <div
                class="items-center space-x-3 rtl:space-x-reverse sm:py-0 py-3 hidden sm:block"
            >
                <button
                    type="button"
                    class="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
                >
                    <icon-microphone-off />
                </button>
                <button
                    type="button"
                    class="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
                >
                    <icon-download />
                </button>
                <button
                    type="button"
                    class="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
                >
                    <icon-camera />
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import IconSend from "@/components/icons/icon-send.vue";
import IconMicrophoneOff from "@/components/icons/icon-microphone-off.vue";
import IconDownload from "@/components/icons/icon-download.vue";
import IconCamera from "@/components/icons/icon-camera.vue";
/**
 * Global Functions
 * */
import RoomEmojis from "./room_emojis/RoomEmojis";
import { Database } from 'emoji-picker-element';
export default {
    components: {
        IconSend,
        IconMicrophoneOff,
        IconDownload,
        IconCamera,
        RoomEmojis,
    },
    data() {
        return {
            message: "",
            editedMessage: {},
            messageReply: null,
            cursorRangePosition: null,
            files: [],
            fileDialog: false,
            selectUsersTagItem: null,
            selectEmojiItem: null,
            selectTemplatesTextItem: null,
            format: "mp3",
            activeUpOrDownEmojis: null,
            activeUpOrDownUsersTag: null,
            activeUpOrDownTemplatesText: null,
            emojisDB: new Database({ dataSource: this.emojiDataSource }),
            emojiOpened: false,
            keepKeyboardOpen: false,
            filteredEmojis: [],
            filteredUsersTag: [],
            selectedUsersTag: [],
            filteredTemplatesText: [],
            recorder: this.initRecorder(),
            isRecording: false,
        };
    },
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
