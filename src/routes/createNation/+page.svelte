<script lang="ts">
    import { Stepper, Step, RangeSlider } from "@skeletonlabs/skeleton";
    import type { PopupSettings } from "@skeletonlabs/skeleton";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { enhance } from "$app/forms";
    import { PoliticalCompassTest } from "$lib/politicalTest";
    import { onMount } from "svelte";
    import type { CompassScore, Question } from "$lib/politicalTest";

    let nationName: string;

    let test: PoliticalCompassTest;
    let currentQuestion: Question | null;
    let score: CompassScore;

    onMount(() => {
        test = new PoliticalCompassTest();
        currentQuestion = test.currentQuestion;
    });

    function selectAnswer(answerIndex: number) {
        test.answerQuestion(answerIndex);
        if (test.hasNextQuestion) {
            currentQuestion = test.currentQuestion;
        } else {
            score = test.getScore();
            currentQuestion = null;
        }
    }

    const submitHandle: SubmitFunction = ({ formData, cancel }) => {
		if (nationName.length <= 4) cancel();

		formData.set("name", nationName);
		formData.set("authority", `${score.authority}`);
		formData.set("economic", `${score.economic}`);
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
                        <svelte:fragment slot="header">Next, we have a few questions about your country.</svelte:fragment>
                        {#if currentQuestion}
                            <div>
                                <h2>{currentQuestion.questionText}</h2>
                                <div class="btn-group-vertical variant-filled w-full">
                                    {#each currentQuestion.answers as answer, i}
                                        <button on:click={() => selectAnswer(i)}>
                                            {answer.text}
                                        </button>
                                    {/each}
                                </div>
                            </div>
                        {:else if score}
                            <div>
                                <h2>Your Results</h2>
                                <p>Authority Score: {score.authority}</p>
                                <p>Economic Score: {score.economic}</p>

                                <RangeSlider name="authority-slider" bind:value={score.authority} min={-10} max={10} step={1} disabled={true}>
                                    <div class="flex justify-between items-center">
                                        <div class="font-bold">Libertarian</div>
                                        <div class="font-bold">Authoritarian</div>
                                    </div>
                                </RangeSlider>

                                <RangeSlider name="economic-slider" bind:value={score.economic} min={-10} max={10} step={1} disabled={true}>
                                    <div class="flex justify-between items-center">
                                        <div class="font-bold">Capitalist</div>
                                        <div class="font-bold">Communist</div>
                                    </div>
                                </RangeSlider>
                            </div>
                        {/if}
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