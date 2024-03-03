<script lang="ts">
    import { Stepper, Step, RadioGroup, RadioItem, popup, FileDropzone } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';

    let nationName: string;
    let system: number;

    
    const popupCapitalism: PopupSettings = {
        event: 'hover',
        target: 'popupCapitalism',
        placement: 'top'
    };
    const popupSocialism: PopupSettings = {
        event: 'hover',
        target: 'popupSocialism',
        placement: 'top'
    };
    const popupDictatorship: PopupSettings = {
        event: 'hover',
        target: 'popupDictatorship',
        placement: 'top'
    };
</script>

<div class="py-10 p-0 mx-auto max-w-lg">
    <div class="card p-6 space-y-6 shadow-xl text-left">
        <Stepper>
            <Step>
                <svelte:fragment slot="header">Let's get your nation created!</svelte:fragment>
                <label class="label" for="nationName">
                    <span>To start, please name your nation.</span>
                    <input id="nationName" name="nationName" type="text" placeholder="Petoria" class="input" bind:value={nationName} />
                </label>
            </Step>
            <Step>
                <svelte:fragment slot="header">Choose a system for your nation.</svelte:fragment>
                Brief description of how system affects nation
                Add descriptions for each system on hover <br>
                <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                    <div use:popup={popupCapitalism}><RadioItem bind:group={system} name="justify" value={0}>Capitalism</RadioItem></div>
                    <div data-popup="popupCapitalism" class="card p-4 variant-filled-secondary">
                        test 1
                        <div class="arrow variant-filled-secondary" />
                    </div>
                    <div use:popup={popupSocialism}><RadioItem bind:group={system} name="justify" value={1}>Socialism</RadioItem></div>
                    <div data-popup="popupSocialism" class="card p-4 variant-filled-secondary">
                        test 2
                        <div class="arrow variant-filled-secondary" />
                    </div>
                    <div use:popup={popupDictatorship}><RadioItem bind:group={system} name="justify" value={2}>Dictatorship</RadioItem></div>
                    <div data-popup="popupDictatorship" class="card p-4 variant-filled-secondary">
                        test 3
                        <div class="arrow variant-filled-secondary" />
                    </div>
                </RadioGroup>
            </Step>
            <Step>
                <svelte:fragment slot="header">Upload a flag!</svelte:fragment>
                <div>
                    <FileDropzone name="files">
                        <svelte:fragment slot="message"><strong>Upload a file</strong> or drag and drop</svelte:fragment>
                        <svelte:fragment slot="meta">(meta)</svelte:fragment>
                    </FileDropzone>
                </div>
            </Step>
        </Stepper>
    </div>
</div>