<script lang="ts">
    import { Stepper, Step, RadioGroup, RadioItem, popup, FileDropzone } from "@skeletonlabs/skeleton";
    import type { PopupSettings } from "@skeletonlabs/skeleton";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { enhance } from "$app/forms";

    let nationName: string;
    let system: number;

    
    const popupCapitalism: PopupSettings = {
        event: "hover",
        target: "popupCapitalism",
        placement: "top"
    };
    const popupSocialism: PopupSettings = {
        event: "hover",
        target: "popupSocialism",
        placement: "top"
    };
    const popupDictatorship: PopupSettings = {
        event: "hover",
        target: "popupDictatorship",
        placement: "top"
    };

    const submitHandle: SubmitFunction = ({ formData, cancel }) => {
		console.log({ nationName, system });

		if (nationName.length <= 4) cancel();

		formData.set("name", nationName);
		formData.set("system", `${system}`);
	}
</script>

<div class="py-10 p-0 mx-auto max-w-lg">
    <div class="card p-6 space-y-6 shadow-xl text-left">
        
        <form action="" method="POST" use:enhance={submitHandle}>
            <Stepper buttonCompleteType="submit">
                    <Step>
                        <svelte:fragment slot="header">Let"s get your nation created!</svelte:fragment>
                        <label class="label">
                            <span>To start, please name your nation.</span>
                            <input id="name" name="name" type="text" placeholder="Petoria" class="input" bind:value={nationName} />
                        </label>
                    </Step>
                    <Step>
                        <svelte:fragment slot="header">Choose a government system for your new nation.</svelte:fragment>
                        Brief description of how system affects nation
                        Add descriptions for each system on hover <br>
                        <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                            <div use:popup={popupCapitalism}>
                                <RadioItem bind:group={system} name="justify" value={0}>Capitalism</RadioItem>
                            </div>
                            <div use:popup={popupSocialism}>
                                <RadioItem bind:group={system} name="justify" value={1}>Socialism</RadioItem>
                            </div>
                            <div use:popup={popupDictatorship}>
                                <RadioItem bind:group={system} name="justify" value={2}>Dictatorship</RadioItem>
                            </div>
                            
                            <div data-popup="popupCapitalism" class="card">
                                <section class="p-4">You have a faster growing economy with the ability to become a world power, but your citizens are generally unhappier.</section>
                                <div class="arrow" />
                            </div>
                            <div data-popup="popupSocialism" class="card">
                                <section class="p-4">Your citizens are much happier, but your economy grows slower than capitalist nations.</section>
                                <div class="arrow" />
                            </div>
                            <div data-popup="popupDictatorship" class="card">
                                <section class="p-4">You rule your citizens with an iron fist, prioritizing only industry and military. Your citizens are generally unhappy.</section>
                                <div class="arrow" />
                            </div>
                        </RadioGroup>
                    </Step>
                    <Step>
                        <svelte:fragment slot="header">Upload a flag!</svelte:fragment>
                        <div>
                            <!--<FileDropzone name="files">
                                <svelte:fragment slot="message"><strong>Upload a file</strong> or drag and drop</svelte:fragment>
                                <svelte:fragment slot="meta">(meta)</svelte:fragment>
                            </FileDropzone>-->
                        </div>
                    </Step>
                    <Step>
                        <svelte:fragment slot="header">All set? Then let's go!</svelte:fragment>
                        <div></div>
                    </Step>
            </Stepper>
        </form>
    </div>
</div>