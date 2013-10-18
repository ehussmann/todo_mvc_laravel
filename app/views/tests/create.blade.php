@extends('layouts.scaffold')

@section('main')

<h1>Create Test</h1>

{{ Form::open(array('route' => 'tests.store')) }}
	<ul>
        <li>
            {{ Form::label('test', 'Test:') }}
            {{ Form::text('test') }}
        </li>

		<li>
			{{ Form::submit('Submit', array('class' => 'btn btn-info')) }}
		</li>
	</ul>
{{ Form::close() }}

@if ($errors->any())
	<ul>
		{{ implode('', $errors->all('<li class="error">:message</li>')) }}
	</ul>
@endif

@stop


